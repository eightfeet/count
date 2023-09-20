import {
    Button,
    Dialog,
    Form,
    Selector,
    Slider,
    Space,
    Stepper,
    Toast,
  } from "antd-mobile";
  import s from "./Home.module.scss";
  import { Filter, runningTime } from "~/store";
  import { useCallback } from "react";
  import { useSnapshot } from "valtio";
import { createTest } from "~/helper";
import dayjs from "dayjs";
  function Home() {
    const { filter, isStart } = useSnapshot(runningTime);
    runningTime;
    const [form] = Form.useForm();
  
    const toastValue = (value: number | number[]) => {
      let text = "";
      if (typeof value === "number") {
        text = `${value}`;
      } else {
        text = `${value.join("到")}`;
      }
      Toast.show(`${text}范围内的数字`);
      console.log(value);
    };
  
    const onStart = useCallback(
      (data: Filter) => {
        runningTime.filter = data;
        const subject = createTest(data);
        runningTime.history = [...runningTime.history || [], {
            startAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            subject
        }]
        runningTime.isStart = true;

        console.log(runningTime.history);
        
        Dialog.clear();
      },
      []
    );
  
    const onSet = useCallback(() => {
      Dialog.show({
        content: (
          <Form
            form={form}
            initialValues={filter}
            onFinish={onStart}
            footer={
              <div className={s.footer}>
                <Button block type="submit" color="primary">
                  确定
                </Button>
                &nbsp;
                <Button block onClick={Dialog.clear}>
                  取消
                </Button>
              </div>
            }
          >
            <Form.Item label="方法" name="methodRange" required>
              <Selector
                multiple
                options={[
                  {
                    label: "+",
                    value: 1,
                  },
                  {
                    label: "-",
                    value: 2,
                  },
                  {
                    label: "×",
                    value: 3,
                  },
                  {
                    label: "÷",
                    value: 4,
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="次数" name="times" required>
              <Stepper min={1} max={10} />
            </Form.Item>
            <Form.Item label="范围" name="range" required>
              <Slider
                step={10}
                min={1}
                max={100}
                marks={{
                  1: 1,
                  20: 20,
                  40: 40,
                  60: 60,
                  80: 80,
                  100: 100,
                }}
                ticks
                range
                onAfterChange={toastValue}
              />
            </Form.Item>
            <Form.Item label="题数" name="num" required>
              <Stepper min={1} max={100} digits={0} />
            </Form.Item>
          </Form>
        ),
      });
    }, [filter, form, onStart]);
  
    return (
      <>
        <Space
          block
          style={{ width: "100vw", height: "100vh" }}
          align="center"
          justify="center"
        >
          <Button onClick={onSet}>设置</Button>
        </Space>
        {isStart ? (
          <Space>
            <span>36</span>
            <span>*</span>
            <span>25</span>
          </Space>
        ) : null}
      </>
    );
  }
  
  export default Home;
  