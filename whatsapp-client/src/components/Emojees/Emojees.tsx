import s from "./emojees.module.scss";
import QueryBuilderOutlinedIcon from "@material-ui/icons/QueryBuilderOutlined";
import PetsIcon from "@material-ui/icons/PetsOutlined";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverageOutlined";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccerOutlined";
import DriveEtaIcon from "@material-ui/icons/DriveEtaOutlined";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import EmojiSymbolsOutlinedIcon from "@material-ui/icons/EmojiSymbolsOutlined";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import { emojiList } from "../../data/emojiSorted";

export const Emojees = () => {
  const handleScrollToCategory = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  };

  return (
    <div className={s.emojiContainer}>
      <div className={s.category}>
        <span
          className={s.activeSvg}
          onClick={() => handleScrollToCategory("RecentEmojees")}
        >
          <QueryBuilderOutlinedIcon />
        </span>
        <span onClick={() => handleScrollToCategory("Smileys&People")}>
          <SentimentSatisfiedOutlinedIcon />
        </span>
        <span onClick={() => handleScrollToCategory("Animals&Nature")}>
          <PetsIcon />
        </span>
        <span onClick={() => handleScrollToCategory("Food&Drinks")}>
          <EmojiFoodBeverageIcon />
        </span>
        <span onClick={() => handleScrollToCategory("Activity")}>
          <SportsSoccerIcon />
        </span>
        <span onClick={() => handleScrollToCategory("Travel&Places")}>
          <DriveEtaIcon />
        </span>
        <span onClick={() => handleScrollToCategory("Objects")}>
          <EmojiObjectsOutlinedIcon />
        </span>
        <span onClick={() => handleScrollToCategory("Shorts")}>
          <PublicOutlinedIcon />
        </span>
        <span onClick={() => handleScrollToCategory("Symbols")}>
          <EmojiSymbolsOutlinedIcon />
        </span>
      </div>

      <div className={s.search}>
        <input placeholder="Search Emoji" />
      </div>
      <div id="drawerEmo" className={s.emojeesMain}>
        <div className={s.classWiseEmojees}>
          <a id="RecentEmojees">Recents</a>
          <div className={s.emos}>
            <p>😃</p>
            <p>😄</p>
            <p>😅</p>
            {/* {e.data.map((e) => {
              return <p dangerouslySetInnerHTML={{ __html: e.code_decimal }} />;
            })} */}
          </div>
        </div>

        {emojiList.map((e) => {
          return (
            <div className={s.classWiseEmojees}>
              <a id={e.title.toString().replaceAll(" ", "")}>{e.title}</a>
              {/* @ts-ignore */}
              <div className={s.emos}>
                {e.data.map((e) => {
                  return (
                    <p dangerouslySetInnerHTML={{ __html: e.code_decimal }} />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
