import { Button, Form, Selector, Slider, Stepper, Toast } from "antd-mobile";
import { Filter, runningTime } from "~/store";
import { useCallback } from "react";
import { useSnapshot } from "valtio";
import { createTest } from "~/helper";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
function Home() {
  const { filter } = useSnapshot(runningTime);
  const navigator = useNavigate();
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
  };

  const onStart = useCallback(
    (data: Filter) => {
      runningTime.filter = data;
      const subject = createTest(data);
      runningTime.history = [
        ...(runningTime.history || []),
        {
          startAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          subject,
        },
      ];

      navigator("/history");
    },
    [navigator]
  );

  return (
    <>
      <Form
        form={form}
        initialValues={filter}
        onFinish={onStart}
        footer={
          <>
            <Button block type="submit" color="primary">
              确定
            </Button>
          </>
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
          <Slider
            step={1}
            min={1}
            max={4}
            marks={{
              1: 1,
              2: 2,
              3: 3,
              4: 4
            }}
            ticks
          />
        </Form.Item>
        <Form.Item label="范围" name="range" required>
          <Slider
            step={10}
            min={1}
            max={100}
            marks={{
              1: 1,
              10: 10,
              20: 20,
              30: 30,
              40: 40,
              50: 50,
              60: 60,
              70: 70,
              80: 80,
              90: 90,
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
    </>
  );
}

export default Home;
