import { smokeTestSystem, systemChunk } from "../system-smoke";

// 5 of 6 shards of the all-systems smoke test (see system-smoke.ts)
systemChunk(4, 6).forEach(smokeTestSystem);
