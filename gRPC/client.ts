import { createPromiseClient } from "@bufbuild/connect";
import { createConnectTransport } from "@bufbuild/connect-web";

import { MissionService } from "@/gen/mission/v1/mission_connect";

const transport = createConnectTransport({
	baseUrl: "http://localhost:3002",
	// useBinaryFormat: true,
	credentials: "omit",
});

const client = createPromiseClient(MissionService, transport);

export default client;