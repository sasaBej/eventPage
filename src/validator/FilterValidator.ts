export const filterValidator = (pageIndexValue, eventTypeValue, attendingValue, emailValue, itemsPerPageValue) => {
  if (eventTypeValue != '0' && attendingValue === '0') {
    return {
      PageRequest: { PageIndex: pageIndexValue, ItemsPerPage: itemsPerPageValue },
      Filters: {
        EventType: eventTypeValue
      }
    };
  }
  if (attendingValue === '1' && eventTypeValue == '0') {
    return {
      PageRequest: { PageIndex: pageIndexValue, ItemsPerPage: itemsPerPageValue },
      Filters: {
        Email: emailValue,
        Attending: true
      }
    };
  }
  if (attendingValue === '2' && eventTypeValue == '0') {
    return {
      PageRequest: { PageIndex: pageIndexValue, ItemsPerPage: itemsPerPageValue },
      Filters: {
        Email: emailValue,
        Attending: false
      }
    };
  }
  if (attendingValue === '1' && eventTypeValue != '0') {
    return {
      PageRequest: { PageIndex: pageIndexValue, ItemsPerPage: itemsPerPageValue },
      Filters: {
        EventType: eventTypeValue,
        Email: emailValue,
        Attending: true
      }
    };
  }
  if (attendingValue === '2' && eventTypeValue != '0') {
    return {
      PageRequest: { PageIndex: pageIndexValue, ItemsPerPage: itemsPerPageValue },
      Filters: {
        EventType: eventTypeValue,
        Email: emailValue,
        Attending: false
      }
    };
  }
  if (eventTypeValue == '0') {
    return { PageRequest: { PageIndex: pageIndexValue, ItemsPerPage: itemsPerPageValue } };
  }
};