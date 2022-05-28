import "./OneTaskCard.css";

const OneTaskCard = ({ ...props }) => {
  console.log(props);
  return (
    <>
      <div className="one-task-card-container">
        <div className="one-task-card-title">{props.taskTitle}</div>
        <div className="one-task-card-date">{props.taskDate}</div>
        <div className="one-task-card-seg-2">
          <div className="one-task-card-priority-level">
            Priority Level {props.taskPriorityLevel}
          </div>
          <div className="one-task-card-status">{props.taskStatus}</div>
        </div>
        <div className="one-task-card-group-name">{props.groupName}</div>
        <div className="one-task-card-description">{props.taskDescription}</div>
      </div>
    </>
  );
};

export default OneTaskCard;
