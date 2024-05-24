class Functions {
  validateTicketData(data) {
    let valid = false;
    if (
      data.description &&
      data.title &&
      data.customer_id &&
      data.hardware_type &&
      data.date
    ) {
      valid = true;
    }
    return valid;
  }
}

const functionsHelper = new Functions();
export default functionsHelper;
