import {
    TableColumn as Col,
    Divider,
    Link,
    TableRow as Row,
    Input as Text,
    Button,
} from "@nextui-org/react";
import { CoreTypes } from "@walletconnect/types";

import RequestModalContainer from "../components/RequestModalContainer";
import { useSnapshot } from "valtio";
import ModalStore from "../store/ModalStore";

export default function LoadingModal() {
    const state = useSnapshot(ModalStore.state);
    const message = state.data?.loadingMessage;

    return (
        <RequestModalContainer title="">
            <div style={{ textAlign: "center", padding: "20px" }}>
                <div>
                    <div>
                        <Button color="primary" isLoading>
                            Loading
                        </Button>
                    </div>
                </div>
                <div>
                    <div>
                        <Text>Loading your request...</Text>
                    </div>
                </div>
                {message ? (
                    <div style={{ textAlign: "center" }}>
                        <Divider />
                        <Text>{message}</Text>
                    </div>
                ) : null}
            </div>
        </RequestModalContainer>
    );
}
