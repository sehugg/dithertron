import { smokeTestSystem, systemChunk } from "../system-smoke";

// 4 of 6 shards of the all-systems smoke test (see system-smoke.ts)
systemChunk(3, 6).forEach(smokeTestSystem);
