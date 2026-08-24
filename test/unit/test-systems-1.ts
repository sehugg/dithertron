import { smokeTestSystem, systemChunk } from "../system-smoke";

// 1 of 6 shards of the all-systems smoke test (see system-smoke.ts)
systemChunk(0, 6).forEach(smokeTestSystem);
