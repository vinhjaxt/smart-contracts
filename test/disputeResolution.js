const { assert } = require("chai");
const Market = artifacts.require("MockMarket");
const Plotus = artifacts.require("Plotus");
const Master = artifacts.require("Master");
const PlotusToken = artifacts.require("PlotusToken");
const TokenController = artifacts.require("MockTokenController");
const MockchainLinkBTC = artifacts.require("MockChainLinkAggregator");
const BLOT = artifacts.require("BLOT");
const web3 = Market.web3;
const increaseTime = require("./utils/increaseTime.js").increaseTime;
let gv;
let cr;
let pc;
let nxms;
let proposalId;
let pId;
let mr;
let nxmToken;
let tc;
let td;
let plotusToken;
let plotus;
contract("Market", ([ab1, ab2, ab3, ab4, dr1, dr2, dr3, notMember]) => {
  before(async function () {
    nxms = await Master.deployed();
    nxmToken = await PlotusToken.deployed();
    let address = await nxms.getLatestAddress(toHex("GV"));
    plotusToken = await PlotusToken.deployed();
    gv = await Governance.at(address);
    address = await nxms.getLatestAddress(toHex("PC"));
    pc = await ProposalCategory.at(address);
    address = await nxms.getLatestAddress(toHex("MR"));
    mr = await MemberRoles.at(address);
    tc = await TokenController.at(await nxms.getLatestAddress(toHex("MR")));
    let plotusNewAddress = await masterInstance.getLatestAddress(web3.utils.toHex("PL"));
    plotus = await Plotus.at(plotusNewAddress);
    await mr.addInitialABandDRMembers([ab2, ab3, ab4], [dr1, dr2, dr3], { from: ab1 });
    // proposalId = await gv.getProposalLength();
    // await gv.submitVote(proposalId, 1, {from:dr1});
    // await gv.submitVote(proposalId, 1, {from:dr2});
    // await gv.submitVote(proposalId, 1, {from:dr3});
    // await gv.closeProposal(proposalId);
    // await increaseTime(86401);
  });
});