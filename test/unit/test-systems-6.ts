import { smokeTestSystem, systemChunk } from "../system-smoke";

// 6 of 6 shards of the all-systems smoke test (see system-smoke.ts)
systemChunk(5, 6).forEach(smokeTestSystem);
