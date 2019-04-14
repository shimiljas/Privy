import LocalizedStrings from "react-native-localization";

const keyStrings = new LocalizedStrings({
  en: {
    // sign screen
    resetPassword: "	Reset Password?",
    confirmPassword: "Confirm Password?",
    signInBtn: "Sign In",
    password: "Password",
    email: "Email",
    spinnerText: "Please wait...",
    sucessLogin:`Thanks. Your registration is successful. A verification email has been sent to address you mentioned.Please verify and than you can login into the application.`,

    //warning message
    emailMsg: "Email is required",
    validEmail: "Email is invalid",
    passMeg: "Password is required",
    passShortMsg: "Password is too short",
    passLongMsg: "Password is too long",
    confirmPassReq: "Confirm Password is required",
    confirmPassMatch: "Confirm Password does not match",
    selectTermMsg: "Please select terms of condition",
    termsConditionContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		`,
    noClassesAdded: "No Classes Added",
    scheduleTitle: "Classes",
    add: "Add",
    class: "Class",
    title: "Title",
    description: "Description",
    category: "Category",
    subCategory: "Sub Category",
    lessonType: "Lesson Type",
    startDate: "Start Date",
    endDate: "End Date",
    or: "Or",
    recurring: "Recurring",
    startTime: "Start Time",
    endTime: "End Time",
    duration: "Duration",
    sizeLimit: "Size Limit",
    unlimited: "Unlimited",
    yes: "Yes",
    no: "No",
    price: "Price",
    submit: "Submit",
    date: "Date",
    size: "Size",
    address: "Address",
    time: "Time",
    booking: "Booking",
    cancellations: "Cancellations",
    profile: "Profile",
    student: "Student",
    instructor: "Instructor",
    enter: "Enter",
    name: "Name",
    country: "Country",
    aboutMe: "About Me",
    residence: "Residence",
    street: "Street",
    save: "Save",
    instructChildren: "Instruct Children",
    zipcode: "Zipcode",
    city: "City",
    state: "State",
    location: "Location",
    select: "Select",
    avatar: "Avatar",
    ageOver18: "Age Over 18",
    plan: "Plan",
    perBookedAppointment: `Per Booked
Appointment`,
    perBookedUnlimited: ` Per Booked
Unlimited`,
    switchPlan1: `Switch to $5 Plan to Cancel your
Monthly Subscription`,
    switchPlan2: `Switch to $20 Plan to Cancel your
Per Booking Subscription`,
    alert: "Alert",
    doYouWantToSelectThisPlan: "Do you want to select this plan.",
    cancel: "Cancel",
    ok: "OK",
    planAlreadySelected: "Plan already selected",
    amtGrtThn0Msg: "Amount should be greater than 0",
    amtntGrtCrrBal: "Amount cannot be greater than current balance",
    paypalId: "paypal-id",
    successs: "Success",
    paymentSettingUpdateMsg: "Payment settings updated successfully.",
    myAccount: "My Account",
    choosePlan: "Choose a Plan",
    plan1Price: "$4.99",
    plan2Price: "$19.99",
    selected: "Selected",
    payment: "Payment",
    details: "Details",
    auto: "Auto",
    withdraw: "Withdraw",
    paypalIdLable: "Paypal Id",
    now: "Now",
    amount: "Amount",
    bookingSuccessMsg: "Booking Successful!",
    pay: "Pay",
    expressCheckout: "Express Checkout",
    cardHolderName: "Card Holder Name",
    cardNumber: "Card Number",
    expiry: "Expiry",
    cvv: "CVV",
    special: "Special",
    pushNotification: "Push Notification",
    book: "Book",
    before: "Before",
    explaination: "Explaination",
    another: "Another",
    selectSubCategoryMsg: "Please select sub-category",
    selectLessonMsg: "Please select lessons",
    deleteConfirmationMsg: "Do you want to delete this",
    subCategories: "Sub Categories",
    typeOfLessonsProvided: "Types Of Lessons provided",
    delete: "Delete",
    edit: "Edit",
    services: "Services",
    provided: "Provided",
    noServicesAdded: "No Services Added",

    //booknow
    lessTitle: "Lessons Title",
    timeSlot: "Time Slot",
    toText: "To",
    back: "Back",
    bookNowText: "Book Now",
    okBtn: "OK",
    bookSuccess: "Booking Successful!",
    successText: "Success",

    // calendar
    calendarText: "Calendar",

    // DeshBoard 
    titleEarning:'Earnings',
    sunEarning:'My Reviews',
    titleBooking:'Bookings',
    subBooking:'Cancellations',
    titleLesson:'Lesson Price',
    subLesson:'Special Price',
    titleMessage:'Messages',
    subMessage:'Unread',
    
    distance: 'Distance',
    alpha: 'Alpha',
    instructors: "Instructors",
    search: 'Search',
    providers: 'Providers',
    sort: 'Sort',
    mile: 'mile',
    sendMessage: 'Send',
    message: 'Message',
    send: 'Send',
    list: 'List',
    reviews: 'Reviews',
    total: 'Total',
    categories: 'Categories',
    calendar: 'Calendar',
    lessons: 'Lessons',
    booked: 'Booked',
    upcoming: 'Upcoming',
    cancelled: 'Cancelled',
    previousL: 'Previous',
    selectTimeRange: 'Select Time Range',
    selectDaysRange: 'Select Days Range',
    advanceOptions: 'Advance Options',
    noMsgReceived: 'No Message Received',
    justNow: 'Just Now',
    reply: 'Reply',
    schedule: 'Schedule',
    dashboard: 'Dashboard',
    review: 'Review',
    rating: 'Rating',
    wouldYouRecommend: 'Would you recommend?',
    wasTheInstructorProfessional: 'Was the Instructor Professional?',
    wasTheInsOnTime: 'Was the Instructor on time?',
    lesson: 'Lesson',
    reviewYourLesson: 'Review your Lesson',
    pending: 'Pending',
    approved: 'Approved',
    agree: 'Agree',
    termsCondition: 'Terms & Conditions',
    messages: 'Messages',
    limit: 'Limit',
  },
  de: {
    loginTitle: "Login"
  }
});

export default keyStrings;
