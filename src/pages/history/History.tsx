import { Button, Space } from "antd-mobile";
import React from "react";
import s from "./History.module.scss";
import { useSnapshot } from "valtio";
import { runningTime } from "~/store";

interface Props {}

const History: React.FC<Props> = () => {
  const { history } = useSnapshot(runningTime);
  return (
    <>
      {history?.map((item, index) => (
        <div className={s.page} key={index}>
          <Space block wrap>
            {item.subject?.map((el, index) => (
              <div className={s.item}>
                <span>（{index + 1}）</span> {el.equationStr}
                <span>&nbsp;{el.result}</span>
              </div>
            ))}
          </Space>
          <footer className={s.footer}>{item.startAt}</footer>
        </div>
      ))}
      <Button className={s.printbutton} onClick={() => window.print()}>
        打印
      </Button>
    </>
  );
};

export default History;
