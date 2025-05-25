export const validateID = (idNumber: string) => {
  if (idNumber.length !== 13) return false;

  const first12 = idNumber.slice(0, 12);
  const checkDigit = parseInt(idNumber[12]);
  const calculatedCheckDigit = calculateLuhnChecksum(first12);

  return checkDigit === calculatedCheckDigit;
};

export const calculateLuhnChecksum = (digits: string) => {
  let sum = 0;
  let alternate = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);

    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        digit = Math.floor(digit / 10) + (digit % 10);
      }
    }

    sum += digit;
    alternate = !alternate;
  }

  return (10 - (sum % 10)) % 10;
};

export const generateRandomDate = () => {
  const startYear = 1920;
  const endYear = new Date().getFullYear() - 18;
  const year =
    Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const month = Math.floor(Math.random() * 12) + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  const day = Math.floor(Math.random() * daysInMonth) + 1;

  return {
    year: year,
    month: month.toString().padStart(2, "0"),
    day: day.toString().padStart(2, "0"),
  };
};
