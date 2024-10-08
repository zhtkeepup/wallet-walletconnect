/* eslint-disable react-hooks/rules-of-hooks */
import { Divider, Input as Text } from "@nextui-org/react";

import RequestDataCard from "../components/RequestDataCard";
import RequesDetailsCard from "../components/RequestDetalilsCard";
import RequestMethodCard from "../components/RequestMethodCard";
import ModalStore from "../store/ModalStore";
import { styledToast } from "../utils/HelperUtil";
import {
    approvePolkadotRequest,
    rejectPolkadotRequest,
} from "../utils/PolkadotRequestHandlerUtil";
import { web3wallet } from "../utils/WalletConnectUtil";
import RequestModal from "./RequestModal";
import { useCallback, useState } from "react";

export default function SessionSignPolkadotModal() {
    // Get request and wallet data from store
    const requestEvent = ModalStore.state.data?.requestEvent;
    const requestSession = ModalStore.state.data?.requestSession;
    const [isLoadingApprove, setIsLoadingApprove] = useState(false);
    const [isLoadingReject, setIsLoadingReject] = useState(false);

    // Ensure request and wallet are defined
    if (!requestEvent || !requestSession) {
        return <Text>Missing request data</Text>;
    }

    // Get required request data
    const { topic, params } = requestEvent;
    const { request, chainId } = params;

    // Handle approve action (logic varies based on request method)
    const onApprove = useCallback(async () => {
        if (requestEvent) {
            setIsLoadingApprove(true);
            const response = await approvePolkadotRequest(requestEvent);
            try {
                await web3wallet.respondSessionRequest({
                    topic,
                    response,
                });
            } catch (e) {
                setIsLoadingApprove(false);
                styledToast((e as Error).message, "error");
                return;
            }
            setIsLoadingApprove(false);
            ModalStore.close();
        }
    }, [requestEvent, topic]);

    // Handle reject action
    const onReject = useCallback(async () => {
        if (requestEvent) {
            setIsLoadingReject(true);
            const response = rejectPolkadotRequest(requestEvent);
            try {
                await web3wallet.respondSessionRequest({
                    topic,
                    response,
                });
            } catch (e) {
                setIsLoadingReject(false);
                styledToast((e as Error).message, "error");
                return;
            }
            setIsLoadingReject(false);
            ModalStore.close();
        }
    }, [requestEvent, topic]);

    return (
        <RequestModal
            intention="sign a Polkadot message"
            metadata={requestSession.peer.metadata}
            onApprove={onApprove}
            onReject={onReject}
            approveLoader={{ active: isLoadingApprove }}
            rejectLoader={{ active: isLoadingReject }}
        >
            <RequesDetailsCard
                chains={[chainId ?? ""]}
                protocol={requestSession.relay.protocol}
            />
            <Divider />
            <RequestDataCard data={params} />
            <Divider />
            <RequestMethodCard methods={[request.method]} />
        </RequestModal>
    );
}
