import Navigation from "@/components/Navigation";
import RouteTransition from "@/components/RouteTransition";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { Fragment, ReactNode } from "react";

/**
 * Types
 */
interface Props {
    initialized: boolean;
    children: ReactNode | ReactNode[];
}

/**
 * Container
 */
export default function Layout({ children, initialized }: Props) {
    console.log("Layout:initialized:", initialized);
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                paddingLeft: 0,
                paddingRight: 0,
                display: "flex",
                alignItems: "center",
            }}
        >
            <Card
                bordered={{ "@initial": false, "@xs": true }}
                borderWeight={{ "@initial": "light", "@xs": "light" }}
                style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: initialized ? "normal" : "center",
                    alignItems: initialized ? "normal" : "center",
                    borderRadius: 0,
                    paddingBottom: 5,
                    "@xs": {
                        borderRadius: "$lg",
                        height: "95vh",
                        maxWidth: "450px",
                    },
                }}
            >
                {initialized ? (
                    <Fragment>
                        <RouteTransition>
                            <CardBody
                                style={{
                                    display: "block",
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                    paddingBottom: "40px",
                                    padding: "20px",
                                }}
                            >
                                layout-begin....{children}....layout-end
                            </CardBody>
                        </RouteTransition>

                        <CardFooter
                            style={{
                                height: "85px",
                                minHeight: "85px",
                                position: "sticky",
                                justifyContent: "center",
                                alignItems: "center",

                                backgroundColor: "#111111",
                                zIndex: 200,
                                bottom: 0,
                                left: 0,
                            }}
                        >
                            <Navigation />
                        </CardFooter>
                    </Fragment>
                ) : (
                    <Button isLoading />
                )}
            </Card>
        </div>
    );
}
