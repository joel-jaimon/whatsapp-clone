import AssignmentIcon from "@material-ui/icons/Assignment";

export const Doc = ({ msgParams }: any) => {
    return (
        <small>
            <div className="a-f-a">
                <AssignmentIcon />
                {msgParams.fileName}
            </div>
        </small>
    );
};
