// import { COSMOS_MAINNET_CHAINS, TCosmosChain } from "@/data/COSMOSData";
import { EIP155_CHAINS, TEIP155Chain } from "@/data/EIP155Data";
// import { KADENA_CHAINS, TKadenaChain } from "@/data/KadenaData";
// import { NEAR_TEST_CHAINS, TNearChain } from "@/data/NEARData";
// import { SOLANA_CHAINS, TSolanaChain } from "@/data/SolanaData";
// import { MULTIVERSX_CHAINS, TMultiversxChain } from "@/data/MultiversxData";
// import { TRON_CHAINS, TTronChain } from "@/data/TronData";
import { Divider, Input } from "@nextui-org/react";
import { Fragment } from "react";

/**
 * Types
 */
interface IProps {
    chains: string[];
    protocol: string;
}

/**
 * Component
 */
export default function RequestDetailsCard({ chains, protocol }: IProps) {
    return (
        <Fragment>
            <div>
                <div>
                    <Input defaultValue="Blockchain(s)" />
                    <Input
                        color="$gray400"
                        data-testid="request-details-chain"
                        defaultValue={chains
                            .map(
                                (chain) =>
                                    EIP155_CHAINS[chain as TEIP155Chain]
                                        ?.name ??
                                    // COSMOS_MAINNET_CHAINS[chain as TCosmosChain]
                                    //     ?.name ??
                                    // SOLANA_CHAINS[chain as TSolanaChain]
                                    //     ?.name ??
                                    // NEAR_TEST_CHAINS[chain as TNearChain]
                                    //     ?.name ??
                                    // MULTIVERSX_CHAINS[chain as TMultiversxChain]
                                    //     ?.name ??
                                    // TRON_CHAINS[chain as TTronChain]?.name ??
                                    // KADENA_CHAINS[chain as TKadenaChain]
                                    //     ?.name ??
                                    chain
                            )
                            .join(", ")}
                    />
                </div>
            </div>

            <Divider y={2} />

            <div>
                <div>
                    <Input defaultValue="Relay Protocol" />
                    <Input
                        color="$gray400"
                        data-testid="request-detauls-realy-protocol"
                        defaultValue={protocol}
                    />
                </div>
            </div>
        </Fragment>
    );
}
