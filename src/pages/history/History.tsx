import { Button, Divider, Space } from "antd-mobile";
import React from "react";
import s from "./History.module.scss";
import { useSnapshot } from "valtio";
import { runningTime } from "~/store";
import { useNavigate } from "react-router-dom";

interface Props { }

const History: React.FC<Props> = () => {
  const { history, filter } = useSnapshot(runningTime);
  const navigator = useNavigate();

  return (
    <div>
      <br />
      <Space block justify="center">
        <Button block className={s.printbutton} onClick={() => navigator("/")}>
          出题
        </Button>
        <Button block className={s.printbutton} onClick={() => window.print()}>
          打印
        </Button>
        <Button
          block
          className={s.printbutton}
          onClick={() => (runningTime.history = [])}
        >
          清空记录
        </Button>
      </Space>
      <br />

      {history?.map((item, index) => (
        <div className={s.page} key={index}>
          <div>
            <Space block wrap>
              {item.subject?.map((el, index) => (
                <div className={s.item}>
                  <span className={s.index}>{index + 1}</span> {el.equationStr}
                  <span>&nbsp;</span>
                </div>
              ))}
            </Space>
          </div>
          {
            filter?.displayExerciseKey ? <div className={s.result}>
              <Divider>答案</Divider>
              <Space block wrap>
                {item.subject?.map((el, index) => (
                  <div className={s.item}>
                    <span className={s.index}>{index + 1}</span> {el.equationStr}
                    <span style={{ fontWeight: "bolder" }}>
                      &nbsp;{el.result}
                    </span>
                  </div>
                ))}
              </Space>
            </div> : null
          }

        </div>
      ))}
    </div>
  );
};

export default History;
