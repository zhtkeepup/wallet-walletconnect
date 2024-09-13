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
                <Row>
                    <Col>
                        <Button color="primary" isLoading>
                            Loading
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text>Loading your request...</Text>
                    </Col>
                </Row>
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
