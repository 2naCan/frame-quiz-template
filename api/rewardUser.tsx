import { OpenFormatSDK, Chains } from "@openformat/sdk";
import { ActivityType, RewardType, toWei } from "@openformat/sdk";

const sdk = new OpenFormatSDK({
    appId: process.env.DAPP_ID,
    signer: process.env.PRIVATE_KEY,// Your private key in Open Format dApp dashboard
    network: Chains.arbitrumSepolia,
});

export const rewardUser = async (custodyAddress: string, score: string) => {

    const params = {
        // The address of the user who is receiving the XP tokens
        receiver: custodyAddress,
        tokens: [
            {
                // A given ID for an action a user completes in your application
                id: "complete_activity",
                // The smart contract address of your XP TOKEN
                address: process.env.SMART_CONTRACT_ADDRESS,
                // The amount of XP tokens the receiver address will receive
                amount: toWei(score),
                type: RewardType.XP_TOKEN,
                activityType: ActivityType.ACTION,
            },
        ],
    };

    await sdk.Reward.trigger(params);
}
