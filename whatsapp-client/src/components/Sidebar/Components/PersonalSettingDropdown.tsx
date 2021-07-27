import s from "../sidebarStyles.module.scss";

export const PersonalSettingDropdown = () => {
  return (
    <div className={s.dropDown}>
      <div className={s.list}>
        <p>New group</p>
      </div>
      <div className={s.list}>
        <p>Create a room</p>
      </div>
      <div className={s.list}>
        <p>Profile</p>
      </div>
      <div className={s.list}>
        <p>Starred</p>
      </div>
      <div className={s.list}>
        <p>Settings</p>
      </div>
      <div className={s.list}>
        <p>Logout</p>
      </div>
    </div>
  );
};
