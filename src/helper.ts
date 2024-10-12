type Method = 1 | 2 | 3 | 4; // 定义运算方法类型

/**
 * 创建数学计算题
 * @param num 题目数目
 * @param times 进行几次运算
 * @param range 要计算的数据项在此范围内
 * @param methodRange 运算范围，数组参数，元素为 1|2|3|4
 * @returns 数学计算题数组
 */
export function createTest(num: number, times: number, range: [number, number], methodRange: Method[]): { equation: string; equationStr: string; equationText: string; result: number }[] {
    const questions: { equation: string; equationStr: string; equationText: string; result: number }[] = [];

    while (questions.length < num) {
        let equation = '';
        let equationStr = '';
        let equationText = '';
        let result = 0;
        let currentResult = 0;
        const usedNumbers = new Set<number>(); // 用于记录已使用的数字

        for (let j = 0; j < times; j++) {
            let randomNum = 0;
            do {
                randomNum = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
            } while (randomNum === 0 || usedNumbers.has(randomNum));

            usedNumbers.add(randomNum);
            const randomMethodIndex = Math.floor(Math.random() * methodRange.length);
            const method = methodRange[randomMethodIndex];

            if (j === 0) {
                currentResult = randomNum;
                equation += `${randomNum}`;
                equationStr += `${randomNum}`;
                equationText += `${randomNum}`;
            } else {
                switch (method) {
                    case 1:
                        currentResult += randomNum;
                        equation += ` + ${randomNum}`;
                        equationStr += ` + ${randomNum}`;
                        equationText += ` + ${randomNum}`;
                        break;
                    case 2:
                        // 确保减法不会使结果小于0
                        randomNum = Math.min(randomNum, currentResult);
                        currentResult -= randomNum;
                        equation += ` - ${randomNum}`;
                        equationStr += ` - ${randomNum}`;
                        equationText += ` - ${randomNum}`;
                        break;
                    case 3:
                        currentResult *= randomNum;
                        equation += ` * ${randomNum}`;
                        equationStr += ` * ${randomNum}`;
                        equationText += ` × ${randomNum}`;
                        break;
                    case 4:
                        // 确保除法结果为整数且不小于0
                        let divisor = Math.max(1, Math.floor(currentResult / (Math.random() * (currentResult + 1))));
                        if (currentResult % divisor !== 0) { // 如果不是整除
                            // 调整除数使得结果为整数
                            divisor = currentResult; // 最简单的方式就是让除数等于当前结果
                        }
                        currentResult = Math.floor(currentResult / divisor); // 确保结果为整数
                        equation += ` / ${divisor}`;
                        equationStr += ` / ${divisor}`;
                        equationText += ` ÷ ${divisor}`;
                        break;
                    default:
                        throw new Error('Invalid method');
                }
            }
        }

        result = currentResult;
        if (result === 0) continue; // 如果结果为0，重新生成题目

        questions.push({ equation, equationStr, equationText, result });
    }

    return questions;
}

// 示例调用
const testQuestions = createTest(5, 3, [1, 50], [1, 2, 3, 4]);
console.log(testQuestions);