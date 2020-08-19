const { assert } = require("chai");
const Market = artifacts.require("MockMarket");
const Plotus = artifacts.require("Plotus");
const Master = artifacts.require("Master");
const PlotusToken = artifacts.require("PlotusToken");
const MockchainLinkBTC = artifacts.require("MockChainLinkAggregator");
const BLOT = artifacts.require("BLOT");
const web3 = Market.web3;
const increaseTime = require("./utils/increaseTime.js").increaseTime;

contract("Market", async function ([user1,user2,user3,user4,user5,user6,user7,user8,user9,user10]) {

  it("1.Scenario 1 - Stake in ETH < minstake (no stake in LOT) and time passed < min time passed", async () => {
  let tokenPrice = 0.012;
  let masterInstance = await Master.deployed();
  let plotusToken = await PlotusToken.deployed();
  let BLOTInstance = await BLOT.deployed();
  let MockchainLinkInstance = await MockchainLinkBTC.deployed();
  let plotusNewAddress = await masterInstance.getLatestAddress(web3.utils.toHex("PL"));
  let plotusNewInstance = await Plotus.at(plotusNewAddress);
  const openMarkets = await plotusNewInstance.getOpenMarkets();
  console.log("marketType",openMarkets["_marketTypes"][4]/1)
  marketInstance = await Market.at(openMarkets["_openMarkets"][4]);
  await marketInstance.setMockPriceFlag(false);
  await increaseTime(10001);
  assert.ok(marketInstance);

  await MockchainLinkInstance.setLatestAnswer(1195000000000);
  let currentPriceAfter = await MockchainLinkInstance.latestAnswer();
  console.log(currentPriceAfter/1)

  await marketInstance.setOptionRanges(11900,12000);
  let priceOption1 = await marketInstance.getOptionPrice(1);
  let priceOption2 = await marketInstance.getOptionPrice(2);
  let priceOption3 = await marketInstance.getOptionPrice(3);
  console.log(priceOption1/1,priceOption2/1,priceOption3/1)

  await marketInstance.placePrediction(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "1000000000000000000",
    1,
    1,
    { value: "1000000000000000000", from: user1 }
  );

   await marketInstance.placePrediction(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "2000000000000000000",
    2,
    1,
    { value: "2000000000000000000", from: user2 }
  );


   await marketInstance.placePrediction(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "10000000000000000000",
    3,
    1,
    { value: "10000000000000000000", from: user3 }
  );

   await increaseTime(21600);
   let currentPriceAfter_af = await MockchainLinkInstance.latestAnswer();
  console.log(currentPriceAfter_af/1)
  let priceOption1_af = await marketInstance.getOptionPrice(1);
  let priceOption2_af = await marketInstance.getOptionPrice(2);
  let priceOption3_af = await marketInstance.getOptionPrice(3);
  let optionPriceETH1 = (priceOption1_af/1);
  let optionPriceLOT1 = (priceOption1_af/1)/tokenPrice;
  assert.equal(optionPriceETH1/1000,0.013)
  assert.equal(optionPriceLOT1/1000,1.157)
  let optionPriceETH2 = (priceOption2_af/1);
  let optionPriceLOT2 = (priceOption2_af/1)/tokenPrice;
  assert.equal(optionPriceETH2/1000,0.027)
  assert.equal(optionPriceLOT2/1000,2.315)
  let optionPriceETH3 = (priceOption3_af/1);
  let optionPriceLOT3 = (priceOption3_af/1)/tokenPrice;
  assert.equal(optionPriceETH3/1000,0.013)
  assert.equal(optionPriceLOT3/1000,1.157)
  });
});

contract("Market", async function ([user1,user2,user3,user4,user5,user6,user7,user8,user9,user10]) {
  it("2.Scenario 2 - Stake in LOT< minstake (no stake in ETH) and time passed < min time passed", async () => {
  let tokenPrice = 0.012;
  let masterInstance = await Master.deployed();
  let plotusToken = await PlotusToken.deployed();
  let BLOTInstance = await BLOT.deployed();
  let MockchainLinkInstance = await MockchainLinkBTC.deployed();
  let plotusNewAddress = await masterInstance.getLatestAddress(web3.utils.toHex("PL"));
  let plotusNewInstance = await Plotus.at(plotusNewAddress);
  const openMarkets = await plotusNewInstance.getOpenMarkets();
  console.log("marketType",openMarkets["_marketTypes"][4]/1)
  marketInstance = await Market.at(openMarkets["_openMarkets"][4]);
  await marketInstance.setMockPriceFlag(false);
  await increaseTime(10001);
  assert.ok(marketInstance);

  await MockchainLinkInstance.setLatestAnswer(1195000000000);
  let currentPriceAfter = await MockchainLinkInstance.latestAnswer();
  console.log(currentPriceAfter/1)
  await marketInstance.setOptionRanges(11900,12000);
  let priceOption1 = await marketInstance.getOptionPrice(1);
  let priceOption2 = await marketInstance.getOptionPrice(2);
  let priceOption3 = await marketInstance.getOptionPrice(3);
  console.log(priceOption1/1,priceOption2/1,priceOption3/1)
 
 await plotusToken.approve(marketInstance.address, "10000000000000000000000");
  await marketInstance.placePrediction(
    plotusToken.address,
    "100000000000000000000",
    1,
    1,
    {
      from: user1,
    }
  );

   await marketInstance.placePrediction(
    plotusToken.address,
    "100000000000000000000",
    2,
    1,
    {
      from: user1,
    }
  );

    await marketInstance.placePrediction(
    plotusToken.address,
    "100000000000000000000",
    3,
    1,
    {
      from: user1,
    }
  );

   await increaseTime(21600);
   let currentPriceAfter_af = await MockchainLinkInstance.latestAnswer();
  console.log(currentPriceAfter_af/1)
  let priceOption1_af = await marketInstance.getOptionPrice(1);
  let priceOption2_af = await marketInstance.getOptionPrice(2);
  let priceOption3_af = await marketInstance.getOptionPrice(3);
  let optionPriceETH1 = (priceOption1_af/1);
  let optionPriceLOT1 = (priceOption1_af/1)/tokenPrice;
  assert.equal(optionPriceETH1/1000,0.013)
  assert.equal(optionPriceLOT1/1000,1.157)
  let optionPriceETH2 = (priceOption2_af/1);
  let optionPriceLOT2 = (priceOption2_af/1)/tokenPrice;
  assert.equal(optionPriceETH2/1000,0.027)
  assert.equal(optionPriceLOT2/1000,2.315)
  let optionPriceETH3 = (priceOption3_af/1);
  let optionPriceLOT3 = (priceOption3_af/1)/tokenPrice;
  assert.equal(optionPriceETH3/1000,0.013)
  assert.equal(optionPriceLOT3/1000,1.157)
  });
});

contract("Market", async function ([user1,user2,user3,user4,user5,user6,user7,user8,user9,user10]) {
 it("3.Scenario 3 - Stake in LOT+ETH> minstake and time passed < min time passed", async () => {
  let tokenPrice = 0.012;
  let masterInstance = await Master.deployed();
  let plotusToken = await PlotusToken.deployed();
  let BLOTInstance = await BLOT.deployed();
  let MockchainLinkInstance = await MockchainLinkBTC.deployed();
  let plotusNewAddress = await masterInstance.getLatestAddress(web3.utils.toHex("PL"));
  let plotusNewInstance = await Plotus.at(plotusNewAddress);
  const openMarkets = await plotusNewInstance.getOpenMarkets();
  console.log("marketType",openMarkets["_marketTypes"][4]/1)
  marketInstance = await Market.at(openMarkets["_openMarkets"][4]);
  await marketInstance.setMockPriceFlag(false);
  await increaseTime(10001);
  assert.ok(marketInstance);

  await MockchainLinkInstance.setLatestAnswer(1195000000000);
  let currentPriceAfter = await MockchainLinkInstance.latestAnswer();
  console.log(currentPriceAfter/1)
  await marketInstance.setOptionRanges(11900,12000);
  let priceOption1 = await marketInstance.getOptionPrice(1);
  let priceOption2 = await marketInstance.getOptionPrice(2);
  let priceOption3 = await marketInstance.getOptionPrice(3);
  console.log(priceOption1/1,priceOption2/1,priceOption3/1)

 await plotusToken.approve(marketInstance.address, "10000000000000000000000");
  await marketInstance.placePrediction(
    plotusToken.address,
    "100000000000000000000",
    1,
    1,
    {
      from: user1,
    }
  );

   await marketInstance.placePrediction(
    plotusToken.address,
    "100000000000000000000",
    2,
    1,
    {
      from: user1,
    }
  );

    await marketInstance.placePrediction(
    plotusToken.address,
    "100000000000000000000",
    3,
    1,
    {
      from: user1,
    }
  );

     await marketInstance.placePrediction(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "1000000000000000000",
    1,
    1,
    { value: "1000000000000000000", from: user1 }
  );

      await marketInstance.placePrediction(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "10000000000000000000",
    2,
    1,
    { value: "10000000000000000000", from: user2 }
  );

       await marketInstance.placePrediction(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "5000000000000000000",
    3,
    1,
    { value: "5000000000000000000", from: user2 }
  );

   await increaseTime(21600);
   let currentPriceAfter_af = await MockchainLinkInstance.latestAnswer();
  console.log(currentPriceAfter_af/1)
  let priceOption1_af = await marketInstance.getOptionPrice(1);
  let priceOption2_af = await marketInstance.getOptionPrice(2);
  let priceOption3_af = await marketInstance.getOptionPrice(3);
  let optionPriceETH1 = (priceOption1_af/1);
  let optionPriceLOT1 = (priceOption1_af/1)/tokenPrice;
  assert.equal(optionPriceETH1/1000,0.013)
  assert.equal(optionPriceLOT1/1000,1.157)
  let optionPriceETH2 = (priceOption2_af/1);
  let optionPriceLOT2 = (priceOption2_af/1)/tokenPrice;
  assert.equal(optionPriceETH2/1000,0.027)
  assert.equal(optionPriceLOT2/1000,2.315)
  let optionPriceETH3 = (priceOption3_af/1);
  let optionPriceLOT3 = (priceOption3_af/1)/tokenPrice;
  assert.equal(optionPriceETH3/1000,0.013)
  assert.equal(optionPriceLOT3/1000,1.157)
  });
});

contract("Market", async function ([user1,user2,user3,user4,user5,user6,user7,user8,user9,user10]) {
 it("4.Scenario 3 - Stake in LOT+ETH> minstake and time passed < min time passed", async () => {
  let tokenPrice = 0.012;
  let masterInstance = await Master.deployed();
  let plotusToken = await PlotusToken.deployed();
  let BLOTInstance = await BLOT.deployed();
  let MockchainLinkInstance = await MockchainLinkBTC.deployed();
  let plotusNewAddress = await masterInstance.getLatestAddress(web3.utils.toHex("PL"));
  let plotusNewInstance = await Plotus.at(plotusNewAddress);
  const openMarkets = await plotusNewInstance.getOpenMarkets();
  console.log("marketType",openMarkets["_marketTypes"][4]/1)
  marketInstance = await Market.at(openMarkets["_openMarkets"][4]);
  await marketInstance.setMockPriceFlag(false);
  await increaseTime(10001);
  assert.ok(marketInstance);

  await MockchainLinkInstance.setLatestAnswer(1195000000000);
  let currentPriceAfter = await MockchainLinkInstance.latestAnswer();
  console.log(currentPriceAfter/1)
  await marketInstance.setOptionRanges(11900,12000);
  let priceOption1 = await marketInstance.getOptionPrice(1);
  let priceOption2 = await marketInstance.getOptionPrice(2);
  let priceOption3 = await marketInstance.getOptionPrice(3);
  console.log(priceOption1/1,priceOption2/1,priceOption3/1)

 await plotusToken.approve(marketInstance.address, "10000000000000000000000");
  await marketInstance.placePrediction(
    plotusToken.address,
    "100000000000000000000",
    1,
    1,
    {
      from: user1,
    }
  );

   await marketInstance.placePrediction(
    plotusToken.address,
    "100000000000000000000",
    2,
    1,
    {
      from: user1,
    }
  );

    await marketInstance.placePrediction(
    plotusToken.address,
    "100000000000000000000",
    3,
    1,
    {
      from: user1,
    }
  );

     await marketInstance.placePrediction(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "1000000000000000000",
    1,
    1,
    { value: "1000000000000000000", from: user1 }
  );

      await marketInstance.placePrediction(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "10000000000000000000",
    2,
    1,
    { value: "10000000000000000000", from: user2 }
  );

       await marketInstance.placePrediction(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "5000000000000000000",
    3,
    1,
    { value: "5000000000000000000", from: user2 }
  );

   await increaseTime(21600);
   let currentPriceAfter_af = await MockchainLinkInstance.latestAnswer();
  console.log(currentPriceAfter_af/1)
  let priceOption1_af = await marketInstance.getOptionPrice(1);
  let priceOption2_af = await marketInstance.getOptionPrice(2);
  let priceOption3_af = await marketInstance.getOptionPrice(3);
  let optionPriceETH1 = (priceOption1_af/1);
  let optionPriceLOT1 = (priceOption1_af/1)/tokenPrice;
  assert.equal(optionPriceETH1/1000,0.12)
  assert.equal(optionPriceLOT1/1000,10.066)
  let optionPriceETH2 = (priceOption2_af/1);
  let optionPriceLOT2 = (priceOption2_af/1)/tokenPrice;
  assert.equal(optionPriceETH2/1000,0.119)
  assert.equal(optionPriceLOT2/1000,9.990)
  let optionPriceETH3 = (priceOption3_af/1);
  let optionPriceLOT3 = (priceOption3_af/1)/tokenPrice;
  assert.equal(optionPriceETH3/1000,0.064)
  assert.equal(optionPriceLOT3/1000,5.406)
  });
});

contract("Market", async function ([user1,user2,user3,user4,user5,user6,user7,user8,user9,user10]) {
 it("5.Scenario 4 - Stake in LOT+ETH> minstake and time passed > min time passed", async () => {
  let tokenPrice = 0.012;
  let masterInstance = await Master.deployed();
  let plotusToken = await PlotusToken.deployed();
  let BLOTInstance = await BLOT.deployed();
  let MockchainLinkInstance = await MockchainLinkBTC.deployed();
  let plotusNewAddress = await masterInstance.getLatestAddress(web3.utils.toHex("PL"));
  let plotusNewInstance = await Plotus.at(plotusNewAddress);
  const openMarkets = await plotusNewInstance.getOpenMarkets();
  console.log("marketType",openMarkets["_marketTypes"][4]/1)
  marketInstance = await Market.at(openMarkets["_openMarkets"][4]);
  await marketInstance.setMockPriceFlag(false);
  await increaseTime(10001);
  assert.ok(marketInstance);

  await MockchainLinkInstance.setLatestAnswer(1195000000000);
  let currentPriceAfter = await MockchainLinkInstance.latestAnswer();
  console.log(currentPriceAfter/1)
  await marketInstance.setOptionRanges(11900,12000);
  let priceOption1 = await marketInstance.getOptionPrice(1);
  let priceOption2 = await marketInstance.getOptionPrice(2);
  let priceOption3 = await marketInstance.getOptionPrice(3);
  console.log(priceOption1/1,priceOption2/1,priceOption3/1)

 await plotusToken.approve(marketInstance.address, "10000000000000000000000");
  await marketInstance.placePrediction(
    plotusToken.address,
    "1000000000000000000000",
    1,
    1,
    {
      from: user1,
    }
  );

   await marketInstance.placePrediction(
    plotusToken.address,
    "100000000000000000000",
    2,
    1,
    {
      from: user1,
    }
  );

    await marketInstance.placePrediction(
    plotusToken.address,
    "100000000000000000000",
    3,
    1,
    {
      from: user1,
    }
  );

     await marketInstance.placePrediction(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "1000000000000000000",
    1,
    1,
    { value: "1000000000000000000", from: user1 }
  );

      await marketInstance.placePrediction(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "10000000000000000000",
    2,
    1,
    { value: "10000000000000000000", from: user2 }
  );

       await marketInstance.placePrediction(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "5000000000000000000",
    3,
    1,
    { value: "5000000000000000000", from: user2 }
  );

   await increaseTime(104400);
   let currentPriceAfter_af = await MockchainLinkInstance.latestAnswer();
  console.log(currentPriceAfter_af/1)
  let priceOption1_af = await marketInstance.getOptionPrice(1);
  let priceOption2_af = await marketInstance.getOptionPrice(2);
  let priceOption3_af = await marketInstance.getOptionPrice(3);
  let optionPriceETH1 = (priceOption1_af/1);
  let optionPriceLOT1 = (priceOption1_af/1)/tokenPrice;
  assert.equal(optionPriceETH1/1000,0.121)
  assert.equal(optionPriceLOT1/1000,10.108)
  let optionPriceETH2 = (priceOption2_af/1);
  let optionPriceLOT2 = (priceOption2_af/1)/tokenPrice;
  assert.equal(optionPriceETH2/1000,0.12)
  assert.equal(optionPriceLOT2/1000,10.073)
  let optionPriceETH3 = (priceOption3_af/1);
  let optionPriceLOT3 = (priceOption3_af/1)/tokenPrice;
  assert.equal(optionPriceETH3/1000,0.065)
  assert.equal(optionPriceLOT3/1000,5.448)
  });
});

contract("Market", async function ([user1,user2,user3,user4,user5,user6,user7,user8,user9,user10]) {
 it("6.Scenario 5 - Stake in LOT+ETH> minstake and time passed > min time passed, max distance = 2", async () => {
  let tokenPrice = 0.012;
  let masterInstance = await Master.deployed();
  let plotusToken = await PlotusToken.deployed();
  let BLOTInstance = await BLOT.deployed();
  let MockchainLinkInstance = await MockchainLinkBTC.deployed();
  let plotusNewAddress = await masterInstance.getLatestAddress(web3.utils.toHex("PL"));
  let plotusNewInstance = await Plotus.at(plotusNewAddress);
  const openMarkets = await plotusNewInstance.getOpenMarkets();
  console.log("marketType",openMarkets["_marketTypes"][4]/1)
  marketInstance = await Market.at(openMarkets["_openMarkets"][4]);
  await marketInstance.setMockPriceFlag(false);
  await increaseTime(10001);
  assert.ok(marketInstance);

  await MockchainLinkInstance.setLatestAnswer(1222000000000);
  let currentPriceAfter = await MockchainLinkInstance.latestAnswer();
  console.log(currentPriceAfter/1)
  await marketInstance.setOptionRanges(11900,12000);
  let priceOption1 = await marketInstance.getOptionPrice(1);
  let priceOption2 = await marketInstance.getOptionPrice(2);
  let priceOption3 = await marketInstance.getOptionPrice(3);
  console.log(priceOption1/1,priceOption2/1,priceOption3/1)
 
 await plotusToken.approve(marketInstance.address, "10000000000000000000000");
  await marketInstance.placePrediction(
    plotusToken.address,
    "1000000000000000000000",
    1,
    1,
    {
      from: user1,
    }
  );

   await marketInstance.placePrediction(
    plotusToken.address,
    "100000000000000000000",
    2,
    1,
    {
      from: user1,
    }
  );

    await marketInstance.placePrediction(
    plotusToken.address,
    "100000000000000000000",
    3,
    1,
    {
      from: user1,
    }
  );

     await marketInstance.placePrediction(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "1000000000000000000",
    1,
    1,
    { value: "1000000000000000000", from: user1 }
  );

      await marketInstance.placePrediction(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "10000000000000000000",
    2,
    1,
    { value: "10000000000000000000", from: user2 }
  );

       await marketInstance.placePrediction(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "5000000000000000000",
    3,
    1,
    { value: "5000000000000000000", from: user2 }
  );

   await increaseTime(104400);
   let currentPriceAfter_af = await MockchainLinkInstance.latestAnswer();
  console.log(currentPriceAfter_af/1)
  let priceOption1_af = await marketInstance.getOptionPrice(1);
  let priceOption2_af = await marketInstance.getOptionPrice(2);
  let priceOption3_af = await marketInstance.getOptionPrice(3);
  let optionPriceETH1 = (priceOption1_af/1);
  let optionPriceLOT1 = (priceOption1_af/1)/tokenPrice;
  assert.equal(optionPriceETH1/1000,0.106)
  assert.equal(optionPriceLOT1/1000,8.909)
  let optionPriceETH2 = (priceOption2_af/1);
  let optionPriceLOT2 = (priceOption2_af/1)/tokenPrice;
  assert.equal(optionPriceETH2/1000,0.106)
  assert.equal(optionPriceLOT2/1000,8.874)
  let optionPriceETH3 = (priceOption3_af/1);
  let optionPriceLOT3 = (priceOption3_af/1)/tokenPrice;
  assert.equal(optionPriceETH3/1000,0.079)
  assert.equal(optionPriceLOT3/1000,6.646)
  });
});