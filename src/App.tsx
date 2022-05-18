import { useState, ChangeEvent } from 'react';

interface Condition {
	direction: 'call' | 'put';
	high: number | undefined;
	low: number | undefined;
	risk: number | undefined;
	stopLossRatio: number;
	stopProfitRatio: number;
}

function App() {
	const initialCondition: Condition = {
		direction: 'call',
		high: undefined,
		low: undefined,
		risk: undefined,
		stopLossRatio: 1,
		stopProfitRatio: 2,
	};
	const [condition, setCondition] = useState<Condition>(initialCondition);

	const handleSubmit = (): void => {
		setCondition({ ...condition, risk: condition.high! - condition.low! + 2 });
	};

	return (
		<div className="flex w-100 flex-col px-10 py-5">
			<h1 className="text-2xl text-center pb-5">台指期夜盤當沖策略計算機</h1>

			<div className="flex">
				<div className="flex flex-col w-7/12 border-2">
					{/* 1 */}
					<div className="flex flex-1 w-100 border-b-2">
						<div className="flex flex-none w-40 p-5 border-r-2">
							⓵ 爆大量
							<br />
							（&gt;400口）
						</div>
						<div className="flex flex-1 p-5">
							<fieldset className="mr-5">
								<div>
									<input
										type="radio"
										id="call"
										name="call"
										value="call"
										checked={condition.direction === 'call'}
										onChange={() => setCondition({ ...condition, direction: 'call' })}
									/>
									<label className="ml-1" htmlFor="call">
										多單
									</label>
								</div>
								<div>
									<input
										type="radio"
										id="put"
										name="put"
										value="put"
										checked={condition.direction === 'put'}
										onChange={() => setCondition({ ...condition, direction: 'put' })}
									/>
									<label className="ml-1" htmlFor="put">
										空單
									</label>
								</div>
							</fieldset>
							<fieldset className="mr-5">
								<div>
									高：
									<input
										className="border-b w-20"
										type="number"
										value={condition.high || ''}
										onChange={(e: ChangeEvent<HTMLInputElement>) =>
											setCondition({ ...condition, high: parseInt(e.target.value) })
										}
									/>
								</div>
								<div>
									低：
									<input
										className="border-b w-20"
										type="number"
										value={condition.low || ''}
										onChange={(e: ChangeEvent<HTMLInputElement>) =>
											setCondition({ ...condition, low: parseInt(e.target.value) })
										}
									/>
								</div>
							</fieldset>
							<fieldset>
								<div>
									Risk：
									<input
										className="border-b w-20"
										disabled
										type="number"
										value={condition.risk}
										onChange={(e: ChangeEvent<HTMLInputElement>) =>
											setCondition({ ...condition, high: parseInt(e.target.value) })
										}
									/>
								</div>
							</fieldset>
						</div>
					</div>

					{/* 2 */}
					<div className="flex flex-1 w-100 border-b-2">
						<div className="flex flex-none w-40 p-5 border-r-2">⓶ 停利</div>
						<div className="flex flex-1 p-5">
							<fieldset>
								<div>
									<input
										type="radio"
										id="risk-2"
										name="risk-2"
										value="risk-2"
										checked={condition.stopProfitRatio === 2}
										onChange={() => setCondition({ ...condition, stopProfitRatio: 2 })}
									/>
									<label className="ml-1" htmlFor="risk-2">
										2R（標準，R&gt;20）
									</label>
								</div>
								<div>
									<input
										type="radio"
										id="risk-3"
										name="risk-3"
										value="risk-3"
										checked={condition.stopProfitRatio === 3}
										onChange={() => setCondition({ ...condition, stopProfitRatio: 3 })}
									/>
									<label className="ml-1" htmlFor="risk-3">
										3R（摸頭撈底，行情往內側發展，R&lt;20）
									</label>
								</div>
							</fieldset>
						</div>
					</div>

					{/* 3 */}
					<div className="flex flex-1 w-100">
						<div className="flex flex-none w-40 p-5 border-r-2">⓷ 停損</div>
						<div className="flex flex-1 p-5">
							<fieldset>
								<div>
									<input
										type="radio"
										id="risk-1"
										name="risk-1"
										value="risk-1"
										checked={condition.stopLossRatio === 1}
										onChange={() => setCondition({ ...condition, stopLossRatio: 1 })}
									/>
									<label className="ml-1" htmlFor="risk-1">
										1R（標準）
									</label>
								</div>
								<div>
									<input
										type="radio"
										id="risk-0"
										name="risk-0"
										value="risk-0"
										checked={condition.stopLossRatio === 0}
										onChange={() => setCondition({ ...condition, stopLossRatio: 0 })}
									/>
									<label className="ml-1" htmlFor="risk-0">
										0R（保本出場）
									</label>
								</div>
							</fieldset>
						</div>
					</div>
				</div>
				<div className="flex flex-col w-5/12 border-2 border-l-0 p-5">
					⓸ 下單
					{condition.risk! > 0 && (
						<>
							<div className="flex flex-col flex-1 mt-5">
								<p className="mb-2">觸價單（進場）：</p>
								<div className="flex align-center mb-2">
									{condition.direction === 'call' ? (
										<p className="text-white px-2 py-1" style={{ backgroundColor: '#d22a39' }}>
											買進
										</p>
									) : (
										<p className="text-white px-2 py-1" style={{ backgroundColor: '#3690e0' }}>
											賣出
										</p>
									)}
									<p className="px-2 py-1 border border-r-0">一口</p>
									<p className="px-2 py-1 border">市價</p>
								</div>
								<div className="flex align-center">
									<p className="px-2 py-1 border">
										限價：
										{condition.direction === 'call' ? condition.high! + 1 : condition.low! - 1}
									</p>
									<div className="flex items-center ml-2">
										<input type="radio" checked={condition.direction === 'call'} />
										<label className="ml-1">≥</label>
									</div>
									<div className="flex items-center ml-2">
										<input type="radio" checked={condition.direction === 'put'} />
										<label className="ml-1">≤</label>
									</div>
								</div>
							</div>
							<div className="flex flex-col flex-1 mt-5">
								<p className="mb-2">OCO（出場）：</p>
								<div className="flex align-center mb-2">
									{condition.direction === 'put' ? (
										<p className="text-white px-2 py-1" style={{ backgroundColor: '#d22a39' }}>
											買進
										</p>
									) : (
										<p className="text-white px-2 py-1" style={{ backgroundColor: '#3690e0' }}>
											賣出
										</p>
									)}
									<p className="px-2 py-1 border border-r-0">一口</p>
									<p className="px-2 py-1 border">市價</p>
								</div>
								<div className="flex align-center">
									<p className="px-2 py-1 border border-r-0">
										價格一：
										{condition.direction === 'call'
											? condition.high! + 1 + condition.stopProfitRatio * condition.risk!
											: condition.low! - 1 + condition.stopLossRatio * condition.risk!}
									</p>
									<p className="px-2 py-1 border">
										價格二：
										{condition.direction === 'call'
											? condition.high! + 1 - condition.stopLossRatio * condition.risk!
											: condition.low! - 1 - condition.stopProfitRatio * condition.risk!}
									</p>
								</div>
							</div>
						</>
					)}
				</div>
			</div>

			<div className="flex justify-center mt-5">
				<button
					className="px-3 border border-gray-400 rounded-md mr-5"
					type="button"
					onClick={() => setCondition(initialCondition)}
				>
					Clear
				</button>
				<button className="px-3 border border-gray-400 rounded-md" type="button" onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
}

export default App;
