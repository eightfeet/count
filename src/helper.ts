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
        let validOperationsCount = 0; // 记录有效运算次数

        // 确保每种运算都有机会被执行
        const operations = [];
        for (let i = 0; i < times; i++) {
            operations.push(methodRange[Math.floor(Math.random() * methodRange.length)]);
        }

        for (let j = 0; j < times; j++) {
            let randomNum = 0;
            do {
                randomNum = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
            } while (randomNum === 0 || usedNumbers.has(randomNum)); // 确保随机数不为0且未使用

            usedNumbers.add(randomNum);
            const method = operations[j]; // 从预先生成的运算中获取

            if (j === 0) {
                currentResult = randomNum;
                equation += `${randomNum}`;
                equationStr += `${randomNum}`;
                equationText += `${randomNum}`;
                validOperationsCount++; // 第一次运算有效
            } else {
                let validOperation = false; // 新增标志位，确保运算有效
                let attempts = 0; // 尝试次数，避免死循环
                while (!validOperation && attempts < 100) { // 限制最大尝试次数
                    attempts++;
                    switch (method) {
                        case 1: // 加法
                            currentResult += randomNum;
                            equation += ` + ${randomNum}`;
                            equationStr += ` + ${randomNum}`;
                            equationText += ` + ${randomNum}`;
                            validOperation = true; // 运算有效
                            validOperationsCount++; // 记录有效运算次数
                            break;
                        case 2: // 减法
                            // 确保减法不会使结果小于1
                            if (currentResult - randomNum > 0) {
                                currentResult -= randomNum;
                                equation += ` - ${randomNum}`;
                                equationStr += ` - ${randomNum}`;
                                equationText += ` - ${randomNum}`;
                                validOperation = true; // 运算有效
                                validOperationsCount++; // 记录有效运算次数
                            }
                            break;
                        case 3: // 乘法
                            currentResult *= randomNum;
                            equation += ` * ${randomNum}`;
                            equationStr += ` * ${randomNum}`;
                            equationText += ` × ${randomNum}`;
                            validOperation = true; // 运算有效
                            validOperationsCount++; // 记录有效运算次数
                            break;
                        case 4: // 除法
                            // 确保除法的两个数不相等且都不为0，并且结果为整数
                            if (randomNum !== 0 && currentResult !== randomNum && currentResult % randomNum === 0) {
                                currentResult = Math.floor(currentResult / randomNum); // 确保结果为整数
                                equation += ` / ${randomNum}`;
                                equationStr += ` / ${randomNum}`;
                                equationText += ` ÷ ${randomNum}`;
                                validOperation = true; // 运算有效
                                validOperationsCount++; // 记录有效运算次数
                            }
                            break;
                        default:
                            throw new Error('Invalid method');
                    }
                }
                if (!validOperation) {
                    // 如果尝试次数超过限制，跳出循环
                    break;
                }
            }
        }

        // 确保每次运算都有数据且有效运算次数等于指定次数
        if (currentResult === 0 || usedNumbers.size < times || validOperationsCount < times) continue; // 如果结果为0或没有足够的随机数或有效运算次数不足，重新生成题目

        result = currentResult;
        questions.push({ equation, equationStr, equationText, result });
    }

    return questions;
}

// 示例调用
const testQuestions = createTest(5, 3, [1, 50], [1, 2, 3, 4]);
console.log(testQuestions);
