declare global {
  interface Window { ethereum: any; }
}

export const isMetaMaskInstalled = (): boolean => {
  return typeof window.ethereum !== 'undefined';
};

export const connectMetaMask = async () => {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
};

export const getAccount = async () => {
  const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  return accounts[0];
};

export const isConnected = async () => {
  window.ethereum.isConnected();
};
