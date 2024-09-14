"use client";

import { parseUri } from "@walletconnect/utils";
import PageHeader from "@/components/PageHeader";
// import QrReader from '@/components/QrReader'
import { web3wallet } from "@/utils/WalletConnectUtil";
import { Button, Input } from "@nextui-org/react";
import { Fragment, useEffect, useState } from "react";
import { styledToast } from "@/utils/HelperUtil";
import ModalStore from "@/store/ModalStore";

import AccountCard from "@/components/AccountCard";
import AccountPicker from "@/components/AccountPicker";
import { EIP155_MAINNET_CHAINS, EIP155_TEST_CHAINS } from "@/data/EIP155Data";

import { useSnapshot } from "valtio";
import useSmartAccounts from "@/hooks/useSmartAccounts";
import SettingsStore from "@/store/SettingsStore";

export default function WalletConnectPage(params: { deepLink?: string }) {
    const { deepLink } = params;
    const [uri, setUri] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        testNets,
        eip155Address,
        cosmosAddress,
        solanaAddress,
        polkadotAddress,
        nearAddress,
        multiversxAddress,
        tronAddress,
        tezosAddress,
        kadenaAddress,
        smartAccountEnabled,
    } = useSnapshot(SettingsStore.state);
    const { getAvailableSmartAccounts } = useSmartAccounts();

    async function onConnect(uri: string) {
        console.log("zht,onConnect,uri:", uri);
        const { topic: pairingTopic } = parseUri(uri);
        // if for some reason, the proposal is not received, we need to close the modal when the pairing expires (5mins)
        const pairingExpiredListener = ({ topic }: { topic: string }) => {
            if (pairingTopic === topic) {
                styledToast(
                    "Pairing expired. Please try again with new Connection URI",
                    "error"
                );
                ModalStore.close();
                web3wallet.core.pairing.events.removeListener(
                    "pairing_expire",
                    pairingExpiredListener
                );
            }
        };
        web3wallet.once("session_proposal", () => {
            web3wallet.core.pairing.events.removeListener(
                "pairing_expire",
                pairingExpiredListener
            );
        });
        try {
            console.log("zht,web3wallet.pair...1", new Date());
            setLoading(true);
            web3wallet.core.pairing.events.on(
                "pairing_expire",
                pairingExpiredListener
            );
            console.log("zht,web3wallet.pair...2", new Date());
            await web3wallet.pair({ uri });
            console.log("zht,web3wallet.pair...3", new Date());
        } catch (error) {
            console.log("zht,web3wallet.pair...4:", error);
            styledToast((error as Error).message, "error");
            ModalStore.close();
        } finally {
            console.log("zht,web3wallet.pair...5");
            setLoading(false);
            setUri("");
        }
        console.log("zht,web3wallet.pair...6");
    }

    useEffect(() => {
        if (deepLink) {
            onConnect(deepLink);
        }
    }, [deepLink]);

    return (
        <Fragment>
            <PageHeader title="WalletConnect">
                <div style={{ alignItems: "center" }}>
                    <AccountPicker data-testid="account-picker" />
                    {Object.entries(EIP155_TEST_CHAINS)
                        .filter(
                            ([caip10, { name, logo, rgb }]) =>
                                caip10 == "eip155:11155111"
                        )
                        .map(([caip10, { name, logo, rgb }]) => (
                            <AccountCard
                                key={name}
                                name={name}
                                logo={logo}
                                rgb={rgb}
                                address={eip155Address}
                                chainId={caip10.toString()}
                                data-testid={"chain-card-" + caip10.toString()}
                            />
                        ))}
                </div>
            </PageHeader>
            <>
                {/* <QrReader onConnect={onConnect} /> */}

                <Input
                    defaultValue={"or use walletconnect uri"}
                    size="lg"
                    style={{
                        textAlign: "center",
                        marginTop: "$10",
                        marginBottom: "$10",
                    }}
                />

                <Input
                    style={{ maxWidth: "80%" }}
                    bordered
                    aria-label="wc url connect input"
                    placeholder="e.g. wc:a281567bb3e4..."
                    onChange={(e) => setUri(e.target.value)}
                    defaultValue={uri}
                    value={uri}
                    data-testid="uri-input"
                    endContent={
                        <Button
                            size="lg"
                            disabled={!uri}
                            css={{ marginLeft: -60 }}
                            onClick={() => onConnect(uri)}
                            color="gradient"
                            data-testid="uri-connect-button"
                        >
                            {loading ? (
                                <Button isLoading size="md" color={"default"} />
                            ) : (
                                "Connect"
                            )}
                        </Button>
                    }
                />
            </>
        </Fragment>
    );
}
