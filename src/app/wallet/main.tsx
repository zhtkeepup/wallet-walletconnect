"use client";

import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";

import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import useInitialization from "@/hooks/useInitialization";
import useWalletConnectEventsManager from "@/hooks/useWalletConnectEventsManager";
import { web3wallet } from "@/utils/WalletConnectUtil";
import { RELAYER_EVENTS } from "@walletconnect/core";
import { AppProps } from "next/app";
// import "../main.css";
import { styledToast } from "@/utils/HelperUtil";

export default function Main({ Content }: { Content: any }) {
    // Step 1 - Initialize wallets and wallet connect client
    const initialized = useInitialization();

    // Step 2 - Once initialized, set up wallet connect event manager
    useWalletConnectEventsManager(initialized);
    useEffect(() => {
        console.log("zht,Network 000,initialized:", initialized);
        if (!initialized) return;
        web3wallet?.core.relayer.on(RELAYER_EVENTS.connect, () => {
            console.log("zht,Network connection is restored!");
            styledToast("Network connection is restored!", "success");
        });

        web3wallet?.core.relayer.on(RELAYER_EVENTS.disconnect, () => {
            console.log("zht,Network connection lost.");
            styledToast("Network connection lost.", "error");
        });
    }, [initialized]);
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "justify",
            }}
        >
            <Layout initialized={initialized}>
                zzz123a**********0
                <Toaster />
                zzz123a**********1
                <Content />
                zzz123a**********2
            </Layout>
            modal1:
            <Modal />
            modal2:
        </div>
    );
}
