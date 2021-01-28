<template>
  <h1 class="title is-1">Tokens</h1>
  <p>
    Hive CLI applications need tokens to run. Tokens grant full access to the
    worker API.
  </p>
  <hr />
  <h3 class="title is-4">Active Tokens</h3>
  <p v-if="tokens.length == 0">No existing tokens!</p>
  <table v-else class="table" id="tokens-list">
    <thead>
      <tr>
        <th class="od2-col-expand">Description</th>
        <th class="od2-col-shrink">Token</th>
        <th class="od2-col-shrink">Created</th>
        <th class="od2-col-shrink">Last used</th>
        <th>
          <button
            v-on:click="revokeAll"
            class="button is-fullwidth is-small is-danger is-outlined"
          >
            Revoke All
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="token in tokens" :key="token.getId()">
        <td class="od2-col-expand">{{ token.getDescription() }}</td>
        <td class="od2-col-shrink">
          <samp>&hellip;{{ token.getTokenBit() }}</samp>
        </td>
        <td class="od2-col-shrink od2-col-date">
          {{ formatDate(token.getCreatedAt().toDate()) }}
        </td>
        <td class="od2-col-shrink od2-col-date">
          {{
            token.getLastUsedAt().getSeconds() != 0
              ? formatDate(token.getLastUsedAt().toDate())
              : "&mdash;"
          }}
        </td>
        <td class="od2-col-shrink">
          <button
            v-on:click="revoke(token.getId())"
            class="button is-fullwidth is-small is-danger"
          >
            Revoke
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <hr />
  <h3 class="title is-4">Create New Token</h3>
  <div class="columns mt-4">
    <div id="new-token-name-field" class="column field">
      <label class="label">Description</label>
      <div class="control">
        <input
          v-model="createDescription"
          v-bind:class="{ 'is-danger': missingDescription }"
          v-on:input="missingDescription = false"
          class="input"
          type="text"
        />
      </div>
      <p v-if="!missingDescription" class="help">What's this token for?</p>
      <p v-else class="help is-danger">Please enter a description.</p>
    </div>
    <div class="column is-narrow field">
      <div class="control">
        <button
          id="new-token-submit"
          class="button is-primary"
          v-on:click="submit"
        >
          Create
        </button>
      </div>
    </div>
  </div>
  <div
    v-show="!!createdToken"
    ref="createdTokenNotification"
    id="created-token-notification"
    class="notification is-primary is-light"
  >
    <div>
      <strong>Your Token:&ensp;</strong>
      <samp>{{ createdToken }}</samp>
      &ensp;
      <button
        id="copy-token-button"
        class="button is-small"
        v-on:click="copyNewToken"
      >
        <span class="icon is-small has-text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="white"
              d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"
            />
          </svg>
        </span>
      </button>
      <p class="mt-2">
        Be sure to save this token. You won't be able to see it again.
      </p>
      <p class="mt-2" v-if="createdTokenCopied"><em>Copied!</em></p>
    </div>
  </div>
</template>

<style scoped>
#new-token-name-field {
  max-width: 37rem;
}

@media (min-width: 48em) {
  #new-token-submit {
    margin-top: 24pt;
  }
}

#copy-token-button {
  background: #00947e;
  color: white;
  border: none;
  vertical-align: baseline;
  top: 0.3333rem;
  font-size: 0.9rem;
}

#created-token-notification {
  max-width: 42rem;
  padding-bottom: 24pt;
  display: flex;
  justify-content: space-around;
}

.od2-col-shrink {
  white-space: nowrap;
}

.od2-col-expand {
  width: 99%;
}

.od2-col-date {
  min-width: 9.4em;
}

#tokens-list {
  max-width: 42rem;
}

td {
  vertical-align: middle;
}
</style>

<script>
import {
  CreateWorkerTokenRequest,
  ListWorkerTokensRequest,
  RevokeWorkerTokenRequest,
  RevokeAllWorkerTokensRequest
} from "@od2/hive-web-api/worker_tokens_pb";
import { ManagementPromiseClient } from "@od2/hive-web-api/worker_tokens_grpc_web_pb";

const managementClient = new ManagementPromiseClient("/grpc");

export default {
  name: "Tokens",
  data() {
    return {
      tokens: [],
      createDescription: "",
      missingDescription: false,
      createdToken: "",
      createdTokenCopied: false
    };
  },
  methods: {
    submit: async function() {
      if (!this.createDescription) {
        this.missingDescription = true;
        return;
      }
      const request = new CreateWorkerTokenRequest();
      request.setDescription(this.createDescription);
      const response = await managementClient.createWorkerToken(request);
      this.tokens.push(response.getToken());
      this.createDescription = "";
      this.createdToken = response.getKey();
      this.createdTokenCopied = false;
      this.$nextTick(() => this.$refs.createdTokenNotification.focus());
    },
    revoke: async function(id) {
      const request = new RevokeWorkerTokenRequest();
      request.setTokenId(id);
      await managementClient.revokeWorkerToken(request);
      this.tokens = this.tokens.filter(token => token.getId() != id);
    },
    revokeAll: async function() {
      // TODO This is too aggressive! We should double-check with the user.
      const request = new RevokeAllWorkerTokensRequest();
      await managementClient.revokeAllWorkerTokens(request);
      this.tokens = [];
      this.createdToken = "";
      this.createdTokenCopied = false;
    },
    copyNewToken: async function() {
      await navigator.clipboard.writeText(this.createdToken);
      this.createdTokenCopied = true;
    },
    formatDate: function(d) {
      const pad = n => (n < 10 ? "0" + n : n);
      return (
        `${d.getFullYear()}-` +
        `${pad(d.getMonth() + 1)}-` +
        `${pad(d.getDate())} ` +
        `${pad(d.getHours())}:` +
        `${pad(d.getMinutes())}`
      );
    }
  },
  async mounted() {
    const request = new ListWorkerTokensRequest();
    const response = await managementClient.listWorkerTokens(request);
    this.tokens = response.getTokensList();
  }
};
</script>
