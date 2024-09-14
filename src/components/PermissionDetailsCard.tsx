import { Input } from "@nextui-org/react";

type PermissionAction = {
    description: string;
};

interface IProps {
    scope: PermissionAction[];
}

export default function PermissionDetailsCard({ scope }: IProps) {
    return (
        <div>
            <div>
                <Input defaultValue="Dapp is requesting following permissions" />
                {scope.map((action, index) => {
                    return (
                        <Input
                            defaultValue={action.description}
                            color="$gray400"
                            key={index}
                        />
                    );
                })}
            </div>
        </div>
    );
}
