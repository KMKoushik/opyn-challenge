import React, { useEffect, useState } from 'react';
import {
  Table, Tabs, Radio, Input, Form, Row, Col, Button, Divider, Empty, Badge,
} from 'antd';
import If from './If';
import {
  getRandomInt, getRandomFloat, callData, putData,
} from '../service/util';
import { useAppContext } from '../context';

let usdc = getRandomInt(0, 10000);
let eth = getRandomInt(0, 20);
const fees = getRandomFloat();

const columns = [
  {
    title: 'IV',
    dataIndex: 'iv',
    key: 'iv',
  },
  {
    title: 'Size (Bid / Ask)',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: 'Bid',
    dataIndex: 'bid',
    key: 'bid',
    render: (bid: string) => <p className="text-green-500">{bid}</p>,
    // align: 'left',
  },
  {
    title: 'Ask',
    dataIndex: 'ask',
    key: 'ask',
    render: (bid: string) => <p className="text-red-500">{bid}</p>,
    // align: 'left',
  },
  {
    title: 'Strike',
    key: 'strike',
    dataIndex: 'strike',
    // align: 'left',
  },
];

const { TabPane } = Tabs;

const Options: React.FC = () => {
  const [option, setOption] = useState();
  const [optionType, setOptionType] = useState('call');

  const onChange = (selectedRowKeys: React.Key[], selectedRows: any) => {
    setOption(selectedRows[0]);
  };

  return (
    <div className="px-8 lg:flex">
      <div className="lg:w-1/2 w-full border-gray-200 border rounded-md m-2">
        <Tabs defaultActiveKey="1" centered onChange={setOptionType}>
          <TabPane tab="Call" key="call">
            <Table dataSource={callData} columns={columns} pagination={{ position: ['bottomCenter'] }} rowSelection={{ type: 'radio', onChange }} />
          </TabPane>
          <TabPane tab="Put" key="put">
            <Table dataSource={putData} columns={columns} pagination={{ position: ['bottomCenter'] }} rowSelection={{ type: 'radio', onChange }} />
          </TabPane>
        </Tabs>
      </div>
      <div className="lg:w-1/2 w-full border-gray-200 border rounded-md m-2">
        <Checkout option={option} optionType={optionType} />
      </div>
    </div>
  );
};

type CheckoutProps = {
  option: any,
  optionType: string,
}

type Order = {
  usdAmt: number,
  coinAmt: number,
  type: string,
  optionType: string,
}

const Checkout: React.FC<CheckoutProps> = ({ option, optionType }) => {
  const [type, setType] = useState('buy');
  const [coinAmt, setCoinAmt] = useState(1);
  const [usdAmt, setUsdAmt] = useState(1);
  const [avg, setAvg] = useState(option?.ask || 0);
  const [max, setMax] = useState(option?.size?.split('/')[1]);
  const [orders, setOrders] = useState<Order[]>([]);
  const { showToast } = useAppContext();

  const onCoinChange = (val: number) => {
    setCoinAmt(val);
    setUsdAmt(val * avg);
  };

  const onUsdChange = (val: number) => {
    setUsdAmt(val);
    setCoinAmt(val / avg);
  };

  useEffect(() => {
    setAvg(type === 'buy' ? option?.ask : option?.bid);
    setMax(type === 'buy' ? option?.size?.split('/')[1] : option?.size?.split('/')[0]);
    setUsdAmt(coinAmt * (type === 'buy' ? option?.ask : option?.bid));
  }, [type, option]);

  const getStatus = () => {
    if (coinAmt > max || (eth < (coinAmt + fees) && type === 'sell') || (usdc < usdAmt && type === 'buy') || (eth < fees && type === 'buy')) {
      return 'error';
    }

    return 'success';
  };

  const getErrorMessage = () => {
    if (coinAmt > max) {
      return 'Insufficient liquidity';
    } if ((eth < (coinAmt + fees) && type === 'sell') || (eth < fees && type === 'buy')) {
      return 'Insufficient ETH balance';
    } if (usdc < usdAmt && type === 'buy') {
      return 'Insufficient USDC balance';
    }

    return '';
  };

  const buyOrder = () => {
    if (type === 'buy') {
      usdc -= usdAmt;
      eth -= fees;
      eth = parseFloat(eth.toFixed(6));
    } else {
      eth -= (fees + coinAmt);
      eth = parseFloat(eth.toFixed(6));
    }
    orders.push({
      type, coinAmt, usdAmt, optionType,
    });
    setOrders([...orders]);
    showToast?.('Order placed', 'success');
  };

  return (
    <div>
      <div className="mt-3 ml-5">
        <Radio.Group
          options={['buy', 'sell']}
          onChange={e => setType(e.target.value)}
          value={type}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <div className="mt-4">
        <Form>
          <div className="flex">
            <div className="mx-4 h-24">
              <Form.Item
                label="ETH"
                validateStatus={getStatus()}
                help={getErrorMessage()}
              >
                <Input
                  min={1}
                  onChange={(evt) => onCoinChange(parseFloat(evt.target.value))}
                  value={coinAmt}
                  size="large"
                  type="number"
                />
              </Form.Item>
            </div>
            <div className="mx-4 h-24">
              <Form.Item
                label="USDC"
              >
                <Input
                  min={1}
                  onChange={(evt) => onUsdChange(parseInt(evt.target.value, 10))}
                  value={usdAmt}
                  size="large"
                  type="number"
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex p-3">
            <div className="bg-gray-50 w-1/2 mr-2 rounded-md shadow-md">
              <Row className="p-2 px-6">
                <Col span={12}>Avg. Price</Col>
                <Col span={12}>
                  <If show={!!avg}>
                    {avg}
                    {' '}
                    USDC
                  </If>
                  <If show={!avg}>
                    NA
                  </If>
                </Col>
              </Row>
              <Row className="p-2 px-6">
                <Col span={12}>Fee</Col>
                <Col span={12}>
                  {fees}
                  {' '}
                  ETH
                </Col>
              </Row>
              <Divider orientation="left">Wallet balance</Divider>
              <Row className="p-2 mt-4 px-6">
                <Col span={12}><span className="text-gray-600">USDC Balance</span></Col>
                <Col span={12}>
                  <span className="font-bold">{usdc}</span>
                  {' '}
                  <span className="text-gray-500">
                    USDC
                  </span>
                </Col>
              </Row>
              <Row className="p-2 px-6">
                <Col span={12}><span className="text-gray-600">ETH Balance</span></Col>
                <Col span={12}>
                  <span className="font-bold">{eth}</span>
                  {' '}
                  <span className="text-gray-500">
                    ETH
                  </span>
                </Col>
              </Row>
            </div>
            <div className="bg-gray-50 w-1/2 ml-2 rounded-md shadow-md h-64">
              <MyOrders orders={orders} />
            </div>
          </div>
          <If show={option}>
            <div className="mt-4 ml-4 mb-4">
              <Button type="primary" onClick={buyOrder}>{`Confirm ${type} order`}</Button>
            </div>
          </If>
        </Form>
      </div>
    </div>
  );
};

type MyOrderProps = {
  orders: Order[]
}

const MyOrders: React.FC<MyOrderProps> = ({ orders }) => {
  if (!orders.length) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No orders" />;
  }
  return (
    <div>
      <div className="flex justify-center text-xl text-gray-700 mt-2">
        Orders
      </div>
      <div className=" h-52 overflow-scroll">
        {orders.map((order, index) => (
          <div key={order.coinAmt} className="flex mt-2 ml-2">
            <Badge count={order.type} color={order.type === 'buy' ? 'red' : 'green'} />
            <span>
              {order.optionType}
              {' '}
              order for
              {' '}
              <If show={order.type === 'buy'}>
                <span className="font-bold">{order.usdAmt}</span>
                {' '}
                <span className="text-gray-400 text-sm">
                  USDC
                </span>
              </If>
              <If show={order.type !== 'buy'}>
                <span className="font-bold">{order.coinAmt.toFixed(6)}</span>
                {' '}
                <span className="text-gray-400 text-sm">
                  ETH
                </span>
              </If>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Options;
