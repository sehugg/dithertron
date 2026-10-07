import t from 'tap';
import { SYSTEMS } from '../../src/settings/systems';
import { DithertronSettings } from '../../src/common/types';

// Presets that are known to be inconsistent and are being fixed.
const KNOWN_ISSUES: { [id: string]: string } = {};

const systems = SYSTEMS.filter((s): s is DithertronSettings => s != null);

function paletteSize(s: DithertronSettings): number {
    return s.reduce || s.pal.length;
}

// bits per pixel the system's tile/export format can hold, or 0 if not declared
function formatBits(s: DithertronSettings): number {
    const c: any = s.customize || {};
    const ef: any = s.exportFormat || {};
    if (c.bitsInPlane) return c.bitsInPlane * (c.planes || 1);
    if (ef.bpp) return ef.bpp * (ef.np || 1);
    return 0;
}

function problems(s: DithertronSettings): string[] {
    const bad: string[] = [];
    const eff = paletteSize(s);
    const blockColors = s.block?.colors;

    if (s.reduce && s.reduce > s.pal.length)
        bad.push(`reduce ${s.reduce} exceeds the palette (${s.pal.length})`);
    if (blockColors && blockColors > eff)
        bad.push(`block.colors ${blockColors} exceeds the palette (${eff})`);

    const bits = formatBits(s);
    if (bits && (blockColors || eff) > (1 << bits))
        bad.push(`${blockColors || eff} colors do not fit in ${bits} bits per pixel`);
    const nameBits = s.name.match(/\((\d)bpp\)/);
    if (nameBits && bits && +nameBits[1] !== bits)
        bad.push(`name says ${nameBits[1]}bpp but the format is ${bits}bpp`);

    if (s.block) {
        if (s.width % s.block.w) bad.push(`width ${s.width} is not a multiple of block.w ${s.block.w}`);
        if (s.height % s.block.h) bad.push(`height ${s.height} is not a multiple of block.h ${s.block.h}`);
    }
    if (s.cell) {
        if (s.width % s.cell.w) bad.push(`width ${s.width} is not a multiple of cell.w ${s.cell.w}`);
        if (s.height % s.cell.h) bad.push(`height ${s.height} is not a multiple of cell.h ${s.cell.h}`);
    }

    const choices: any = s.paletteChoices || {};
    for (const key of Object.keys(choices)) {
        const range = choices[key];
        if (range && typeof range === 'object' && 'max' in range && range.max >= eff)
            bad.push(`paletteChoices.${key}.max ${range.max} is outside the palette (${eff})`);
    }

    const sub = s.subPalettes;
    if (sub) {
        const colors = sub.colors ?? blockColors!;
        if (sub.count * colors > eff)
            bad.push(`subPalettes ${sub.count}x${colors} does not fit in the palette (${eff})`);
        if (blockColors !== colors)
            bad.push(`block.colors ${blockColors} differs from subPalettes.colors ${colors}`);
    }
    return bad;
}

t.test('system ids are unique', async t => {
    const seen = new Set<string>();
    for (const s of systems) {
        t.notOk(seen.has(s.id), 'unique id ' + s.id);
        seen.add(s.id);
    }
});

t.test('system presets are internally consistent', async t => {
    for (const s of systems) {
        const bad = problems(s);
        if (KNOWN_ISSUES[s.id]) {
            t.comment(`known issue, skipped: ${s.id}: ${KNOWN_ISSUES[s.id]}`);
            continue;
        }
        t.same(bad, [], s.id);
    }
});

t.test('system names stay short and group by their first word', async t => {
    for (const s of systems) {
        t.ok(s.name.split('(').length <= 2, `${s.id}: at most one parenthetical in "${s.name}"`);
        t.ok(s.name.length <= 45, `${s.id}: "${s.name}" is short enough for the dropdown`);
    }
});

// systems with a native export must be listed above the separator
t.test('exportable systems are above the separator', async t => {
    const separator = SYSTEMS.indexOf(null);
    t.ok(separator > 0, 'there is a separator');
    SYSTEMS.forEach((s, i) => {
        if (s && s.caveat !== undefined) t.ok(s.caveat.trim().length > 10, `${s.id} caveat explains the limitation`);
        if (s && s.toNative) t.ok(i < separator, `${s.id} has toNative and is above the separator`);
    });
    t.equal(SYSTEMS[0]!.id, 'c64.multi', 'the default system is first');
});
