import { createStore } from "vuex";
import { CreateWorkerTokenRequest } from "@od2/hive-api/management_pb";
import { ManagementPromiseClient } from "@od2/hive-api/management_grpc_web_pb";

const managementClient = new ManagementPromiseClient(
  "https://hive.od2.network/grpc"
);

export default createStore({
  state: {},
  mutations: {},
  actions: {
    async listWorkerTokens({ commit }) {
      const tokens = await managementClient.listWorkerTokens(
        new CreateWorkerTokenRequest()
      );
      console.log(tokens);
      commit();
    }
  },
  modules: {}
});
