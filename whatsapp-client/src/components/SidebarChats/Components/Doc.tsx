import AssignmentIcon from "@material-ui/icons/Assignment";

export const Doc = ({ msgParams }: any) => {
    return (
        <small>
            <AssignmentIcon />
            {msgParams.fileName}
        </small>
    );
};
