import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

const walletconnect = new WalletConnectConnector({
  infuraId: 'ed0886764ea14b7790950828fc1844c7',
  rpcUrl: "https://rinkeby.infura.io/v3/ed0886764ea14b7790950828fc1844c7",
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
});



export const connectors = {
  injected: injected,
  walletConnect: walletconnect
};
