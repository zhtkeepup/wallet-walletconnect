import {
    TableColumn as Col,
    Divider,
    Link,
    TableRow as Row,
    Input as Text,
    Button,
} from "@nextui-org/react";
import { CoreTypes } from "@walletconnect/types";
// import NewReleasesIcon from "@mui/icons-material/NewReleases";

import RequestModalContainer from "../components/RequestModalContainer";

interface IProps {
    metadata: CoreTypes.Metadata;
    onApprove: () => void;
    onReject: () => void;
}

// const StyledLink = styled("span", {
//     color: "#697177",
// } as any);

// const StyledProceedButton = styled("p", {
//     margin: "10px auto",
//     padding: "10px",
//     color: "$error",
//     cursor: "pointer",
// } as any);

// const StyledCloseButton = styled("p", {
//     margin: "auto",
//     padding: "10px",
//     border: "1px solid $error",
//     borderRadius: "30px",
// } as any);

export default function ThreatPrompt({
    metadata,
    onApprove,
    onReject,
}: IProps) {
    const { icons, name, url } = metadata;

    return (
        <RequestModalContainer title="">
            <div style={{ textAlign: "center", padding: "20px" }}>
                <Row>
                    <Col>
                        icon
                        {/* <NewReleasesIcon
                            sx={{ fontSize: "55px", color: "$error" }}
                            color="error"
                        /> */}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text>Website flagged</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link
                            style={{ verticalAlign: "middle" }}
                            href={url}
                            data-testid="session-info-card-url"
                        >
                            {url}
                        </Link>
                    </Col>
                </Row>
                <div style={{ textAlign: "center" }}>
                    <Divider />
                    <Text>
                        This website you`re trying to connect is flagged as
                        malicious by multiple security providers. Approving may
                        lead to loss of funds.
                    </Text>
                    <Row>
                        <Button color="warning" onClick={onApprove}>
                            Proceed anyway
                        </Button>
                    </Row>
                    <Row>
                        <Col
                            style={{ margin: "auto", cursor: "pointer" }}
                            onClick={onReject}
                        >
                            <Button>Close</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </RequestModalContainer>
    );
}
