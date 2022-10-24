module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    format_amount: (amount) => {
      // format large numbers with commas
      return parseInt(amount).toLocaleString();
    },
    get_cardImage: () => {
      const randomNum = Math.random();
  
      // Return a random emoji
      if (randomNum > 0.7) {
        return `../../public/images/photo1`;
      } else if (randomNum > 0.4) {
        return `../../public/images/photo2`;
      } else {
        return `../../public/images/photo3`;
      }
    }
  };
  