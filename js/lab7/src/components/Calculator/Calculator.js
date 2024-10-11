import React, { useState, useRef, useEffect } from 'react';
import './Calculator.css';

function Calculator() {
    const currentRate = 669.9;
    const defaultTerm = 12;
    const defaultAmount = 50000;

    const [amount, setAmount] = useState(defaultAmount);
    const [term, setTerm] = useState(defaultTerm);
    const [calculationResult, setCalculationResult] = useState(null);

    const loanSummaryRef = useRef(null);

    const LoanDetail = (props) => {
        return (
            <p>{props.label}: <span>{props.value} руб</span></p>
        );
    }

    const calculateLoan = (event) => {
        event.preventDefault();

        const monthlyRate = (currentRate / 100) / 12;
        const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
        const loanAmount = monthlyPayment * term;
        const loanCost = loanAmount - amount;

        setCalculationResult({
            loanAmount: loanAmount.toFixed(2).replace(".", ","),
            monthlyRate: monthlyPayment.toFixed(2).replace(".", ","),
            loanCost: loanCost.toFixed(2).replace(".", ",")
        });
    };

    const handleAmountChange = (event) => {
        const value = event.target.value;
        setAmount(value);
    };

    const handleAmountKeyDown = (event) => {
        const testEx = /^[0-9.,]$/;

        if (!testEx.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'Tab') {
            event.preventDefault();
        }
    };

    const handleTermChange = (event) => {
        setTerm(event.target.value);
    }

    useEffect(() => {
        if (calculationResult && loanSummaryRef.current) {
            loanSummaryRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [calculationResult]);

    return (
        <section className="credit-calculator">
            <h2>Рассчитайте свой кредит</h2>
            <form onSubmit={calculateLoan}>
                <div>
                    <label htmlFor="rate">Процентная ставка:</label>
                    <input type="text" id="rate" name="rate" value={`${currentRate}%`} className="static" readOnly />
                </div>
                <div>
                    <label htmlFor="amount">Сумма кредита (руб):</label>
                    <input type="number" id="amount" name="amount" placeholder="Введите сумму" required min={defaultAmount} value={amount} onChange={handleAmountChange} onKeyDown={handleAmountKeyDown} />
                </div>
                <div>
                    <label htmlFor="term">Срок кредита (месяцы):</label>
                    <div className="slider">
                        <input type="range" id="term" name="term" min="3" max="72" value={term} onChange={handleTermChange} />
                        <div className="slider-value" id="termValue">{term}</div>
                    </div>
                </div>
                <input type="submit" value="Рассчитать" />
            </form>
            {calculationResult && (
                <div class="loan-summary" ref={loanSummaryRef}>
                    <h3>Результаты расчета</h3>
                    <LoanDetail label="Общая сумма кредита" value={calculationResult.loanAmount} />
                    <LoanDetail label="Ежемесячная выплата" value={calculationResult.monthlyRate} />
                    <LoanDetail label="Стоимость кредита" value={calculationResult.loanCost} />
                </div>
            )}
        </section>
    );
}

export default Calculator;
