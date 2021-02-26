import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import copy from 'copy-to-clipboard';
import * as metamask from '../service/metamask';
import { getRandomInt, truncate } from '../service/util';
import { useAppContext } from '../context';

const Header: React.FC = () => {
  const [metamaskAcct, setMetamaskAcct] = useState('');
  const { setMetaMask } = useAppContext();

  useEffect(() => {
    metamask.getAccount().then(setMetamaskAcct);
  }, []);

  useEffect(() => {
    if (metamaskAcct && metamaskAcct !== '') {
      setMetaMask?.(true);
    } else {
      setMetaMask?.(false);
    }
  }, [metamaskAcct]);

  return (
    <div className="flex p-4 justify-between">
      <div>
        <h1 className="text-xl">oTokens</h1>
        <h2>
          <span className="text-gray-500">
            WETH / USDC
          </span>
          <span className="text-lg text-blue-700 ml-2">
            $
            {getRandomInt(1650, 1750)}
          </span>
        </h2>
      </div>
      <MetaMaskBtn account={metamaskAcct} setMetaMask={setMetamaskAcct} />
    </div>
  );
};

type MetaMaskBtnProps = {
  account: string,
  setMetaMask: any
};

const MetaMaskBtn: React.FC<MetaMaskBtnProps> = ({ account, setMetaMask }) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useAppContext();

  const connectMetaMask = async () => {
    setLoading(true);
    try {
      const acct = await metamask.connectMetaMask();
      setMetaMask(acct);
    } catch (e) {
      showToast?.(e.message, 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    window.ethereum?.on('accountsChanged', (accounts: string[]) => {
      if (!accounts.length) {
        setMetaMask('');
      }
    });
  }, []);

  if (!account || account === '') {
    return <Button type="primary" onClick={connectMetaMask} loading={loading}>Connect metamask</Button>;
  }
  return (
    <div className="flex">
      <Button type="primary" onClick={() => copy(account)}>
        {truncate(account, 10)}
      </Button>
      <Button danger style={{ marginLeft: '1rem' }} onClick={() => setMetaMask('')}>Disconnect</Button>
    </div>
  );
};

export default Header;
