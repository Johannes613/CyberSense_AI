export const allQuizzesData = {
  quiz1: {
    title: "Beginners Quiz",
    questions: [
      {
        id: "q1a",
        type: "multiple-choice",
        text: "Who is responsible for information/data security?",
        options: [
          "The IT department",
          "Security contractors",
          "Management",
          "All computer and system users",
        ],
        correctAnswer: "All computer and system users",
        explanation:
          "While IT and management have specific roles, every single user has a responsibility to follow security policies and protect company data, making security a collective effort.",
      },
      {
        id: "q1b",
        type: "multiple-choice",
        text: "What is the primary purpose of a firewall?",
        options: [
          "To speed up your internet",
          "To monitor network traffic and block unauthorized access",
          "To store passwords securely",
          "To clean viruses from your computer",
        ],
        correctAnswer:
          "To monitor network traffic and block unauthorized access",
        explanation:
          "A firewall acts as a barrier between a trusted internal network and untrusted external networks, controlling incoming and outgoing network traffic based on predetermined security rules.",
      },
      {
        id: "q1c",
        type: "multiple-choice",
        text: "Which of these is the strongest password?",
        options: ["Password123", "MyDogFido", "12345678", "Xq!9$zP#7*"],
        correctAnswer: "Xq!9$zP#7*",
        explanation:
          "A strong password uses a mix of uppercase letters, lowercase letters, numbers, and symbols. 'Xq!9$zP#7*' is the only option that meets this criteria, making it significantly harder to guess or crack.",
      },
      {
        id: "q1d",
        type: "multiple-choice",
        text: "What does 'HTTPS' at the beginning of a URL indicate?",
        options: [
          "The website is hosted in a specific country",
          "The website is for high-speed connections only",
          "The website has a secure, encrypted connection",
          "The website is a government site",
        ],
        correctAnswer: "The website has a secure, encrypted connection",
        explanation:
          "HTTPS (Hypertext Transfer Protocol Secure) means the data sent between your browser and the website is encrypted, protecting it from eavesdroppers. Always look for HTTPS when entering sensitive information.",
      },
      {
        id: "q1e",
        type: "multiple-choice",
        text: "You receive an email with an unexpected attachment. What should you do?",
        options: [
          "Open it immediately to see what it is",
          "Forward it to your friends to ask them",
          "Delete the email without opening the attachment",
          "Reply and ask the sender what it is",
        ],
        correctAnswer: "Delete the email without opening the attachment",
        explanation:
          "Unexpected attachments are a primary way malware is spread. Even if it seems to be from someone you know, their account could be compromised. The safest action is to delete it.",
      },
    ],
  },
  quiz2: {
    title: "Phishing Quiz",
    questions: [
      {
        id: "q2a",
        type: "multiple-choice",
        text: "What is a common sign of a phishing email?",
        options: [
          "A generic greeting like 'Dear Customer'",
          "An offer that seems too good to be true",
          "A sense of urgency or threats",
          "All of the above",
        ],
        correctAnswer: "All of the above",
        explanation:
          "Phishers use all these tactics. Generic greetings, urgent threats ('your account will be closed!'), and unbelievable offers are all red flags designed to make you act without thinking.",
      },
      {
        id: "q2b",
        type: "multiple-choice",
        text: "If you receive a suspicious email asking for your password, you should:",
        options: [
          "Reply with your password",
          "Click the link and enter your password to verify",
          "Ignore and delete the email",
          "Forward it to the company's support email",
        ],
        correctAnswer: "Ignore and delete the email",
        explanation:
          "Legitimate companies will never ask for your password via email. The safest course of action is to delete the email. Reporting it is also a good option if your organization has a process for it.",
      },
      {
        id: "q2c",
        type: "multiple-choice",
        text: "Hovering your mouse over a link in an email can help you see...",
        options: [
          "If the link is popular",
          "The actual web address (URL) it will take you to",
          "How many people have clicked the link",
          "If the link has a virus",
        ],
        correctAnswer: "The actual web address (URL) it will take you to",
        explanation:
          "This is a key verification step. The text of a link can say 'google.com', but the actual URL it points to could be 'malicious-site.com'. Always check where a link is going before you click.",
      },
      {
        id: "q2d",
        type: "multiple-choice",
        text: "Phishing attacks can only happen through email.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation:
          "Phishing can happen through any form of communication, including SMS (smishing), voice calls (vishing), and social media messages.",
      },
      {
        id: "q2e",
        type: "multiple-choice",
        text: "What is 'smishing'?",
        options: [
          "A new type of social media",
          "A phishing attack conducted via SMS/text messages",
          "A secure way to send messages",
          "A type of computer virus",
        ],
        correctAnswer: "A phishing attack conducted via SMS/text messages",
        explanation:
          "Smishing is a combination of 'SMS' and 'phishing'. It's the same deceptive tactic, just carried out through text messages instead of email.",
      },
    ],
  },
  quiz3: {
    title: "Password Security Quiz",
    questions: [
      {
        id: "q3a",
        type: "multiple-choice",
        text: "What is the best practice for password management?",
        options: [
          "Using the same password for all accounts",
          "Writing passwords on a sticky note",
          "Using a unique, complex password for each account",
          "Sharing passwords with trusted friends",
        ],
        correctAnswer: "Using a unique, complex password for each account",
        explanation:
          "Using a unique password for each account ensures that if one service is breached, your other accounts remain secure. A password manager is the best tool to achieve this.",
      },
      {
        id: "q3b",
        type: "multiple-choice",
        text: "What is Two-Factor Authentication (2FA)?",
        options: [
          "A password that is twice as long",
          "A second layer of security in addition to your password",
          "A type of antivirus software",
          "Two different passwords for one account",
        ],
        correctAnswer:
          "A second layer of security in addition to your password",
        explanation:
          "2FA requires you to provide a second piece of information (like a code from your phone) in addition to your password, making it much harder for an attacker to gain access.",
      },
      {
        id: "q3c",
        type: "multiple-choice",
        text: "How often should you ideally change your important passwords?",
        options: [
          "Every day",
          "Every 5 years",
          "Only when you forget it",
          "Every 3 to 6 months",
        ],
        correctAnswer: "Every 3 to 6 months",
        explanation:
          "Regularly changing passwords limits the window of opportunity for attackers who may have obtained an old password. For critical accounts, every 3-6 months is a good guideline.",
      },
      {
        id: "q3d",
        type: "multiple-choice",
        text: "A password manager is a tool that helps you...",
        options: [
          "Generate and store strong, unique passwords",
          "Remember one simple password",
          "Share passwords with your team",
          "Change all your passwords at once",
        ],
        correctAnswer: "Generate and store strong, unique passwords",
        explanation:
          "Password managers are encrypted vaults that securely store all your complex passwords, allowing you to only remember one master password.",
      },
      {
        id: "q3e",
        type: "multiple-choice",
        text: "Is it safe to use public Wi-Fi for logging into sensitive accounts like banking?",
        options: [
          "Yes, it's always encrypted",
          "No, public Wi-Fi can be insecure and expose your data",
          "Only if the Wi-Fi name sounds official",
          "Yes, if you have a good antivirus",
        ],
        correctAnswer: "No, public Wi-Fi can be insecure and expose your data",
        explanation:
          "Public Wi-Fi networks are often unencrypted and can be monitored by attackers. It's best to avoid accessing sensitive accounts on public Wi-Fi or to use a trusted VPN if you must.",
      },
    ],
  },
  quiz4: {
    title: "Cybersecurity Scenarios",
    questions: [
      {
        id: "q4a",
        type: "short-answer",
        text: "Describe in one or two sentences why it is important to use different passwords for different websites.",
        answer:
          "Using different passwords for each website ensures that if one account is compromised, the attacker cannot gain access to your other accounts. It limits the damage and keeps your other services secure.",
      },
      {
        id: "q4b",
        type: "short-answer",
        text: "What steps would you take if you suspect your computer has a virus?",
        answer:
          "If I suspect my computer has a virus, I would immediately disconnect it from the internet to prevent data loss or spreading. Then, I would run a full antivirus scan using trusted software, remove any detected threats, and update all my software and passwords after cleaning.",
      },
      {
        id: "q4c",
        type: "short-answer",
        text: "Why should you be cautious when clicking links in emails?",
        answer:
          "Links in emails can lead to phishing websites designed to steal your personal information or infect your device. Verifying the sender and avoiding suspicious links helps protect against these threats.",
      },
      {
        id: "q4d",
        type: "short-answer",
        text: "Explain what two-factor authentication (2FA) is and why it's useful.",
        answer:
          "Two-factor authentication (2FA) adds an extra layer of security by requiring not just a password but also a second factor, like a code from your phone. This makes it much harder for attackers to access your accounts even if your password is stolen.",
      },
      {
        id: "q4e",
        type: "short-answer",
        text: "How can you recognize a secure website when browsing online?",
        answer:
          "A secure website uses HTTPS instead of HTTP, indicated by a padlock icon in the browser's address bar. This means data sent between your browser and the site is encrypted, making it safer to enter personal information.",
      },
    ],
  },
};

export const allStoriesData = {
  story1: {
    title: "Ahmed and Ali's Social Media Adventures",
    prompts: [
      {
        id: "s1a",
        text: "Write down a list of things you've learned after reading the story.",
        aiResponse:
          "I learned that it is important to think before posting anything online and never try dangerous things to get more followers and likes. It's crucial to ensure that my words and actions are respectful and considerate.",
      },
      {
        id: "s1b",
        text: "What could Ahmed and Ali have done differently?",
        aiResponse:
          "They could have chosen a safer activity to share with their friends. Instead of a dangerous stunt, they could have posted about a hobby, a school project, or a fun day out that didn't involve risks.",
      },
      {
        id: "s1c",
        text: "Why is seeking 'likes' and 'followers' sometimes dangerous?",
        aiResponse:
          "It can lead to poor decision-making and risky behavior. People might compromise their safety or values to gain online popularity, which is temporary and not as important as real-world well-being.",
      },
      {
        id: "s1d",
        text: "Who should you talk to if you feel pressured to do something online?",
        aiResponse:
          "You should always talk to a trusted adult, like a parent, guardian, or teacher. They can offer guidance and help you navigate difficult online situations safely.",
      },
      {
        id: "s1e",
        text: "What is a positive way to use social media, based on this story's lesson?",
        aiResponse:
          "A positive way is to share creativity, hobbies, and positive experiences. You can use it to connect with friends in a safe manner, learn new things, and spread kindness and support.",
      },
    ],
  },
};
export const allEmailsData = {
  1: {
    id: "1",
    initial: "G",
    color: "#4A90E2",
    sender: "Google",
    from: "no-reply@google.com",
    to: "y.adamu@student.adu.ac.ae",
    subject: "Security alert: New sign-in",
    time: "9:41 AM",
    isPhishing: false,
    correctAction: "delete",
    body: "A new sign-in to your Google Account was detected on a Windows device.\n\nIf this was you, no action is required. If not, please secure your account immediately.",
    responses: {
      delete: {
        type: "success",
        title: "Action Correct",
        message:
          "Correct. This was a real alert, and deleting it helps keep your inbox tidy.",
        score: 1,
      },
      report: {
        type: "warning",
        title: "Action Neutral",
        message: "Not harmful, but unnecessary for legitimate alerts.",
        score: 0,
      },
      click: {
        type: "warning",
        title: "Action Neutral",
        message:
          "No harm done, but avoid clicking links in alerts unnecessarily.",
        score: 0,
      },
    },
  },
  2: {
    id: "2",
    initial: "A",
    color: "#D73A49",
    sender: "Amazon Supportt",
    from: "support@amzn-help.com",
    to: "y.adamu@student.adu.ac.ae",
    subject: "Action Required: Your Account is Suspended!",
    time: "9:32 AM",
    isPhishing: true,
    correctAction: "report",
    body: "We have detect unusual activity. Please click here to verify: http://amazon-verify-user.info",
    responses: {
      delete: {
        type: "warning",
        title: "Good, but not the Best",
        message: "Safe choice, but reporting is better to prevent this scam.",
        score: 0,
      },
      report: {
        type: "success",
        title: "Excellent Choice!",
        message: "Reporting helps stop phishing threats for others.",
        score: 1,
      },
      click: {
        type: "danger",
        title: "Action Failed",
        message:
          "This was a scam. Clicking could have compromised your credentials.",
        score: -1,
      },
    },
  },
  3: {
    id: "3",
    initial: "S",
    color: "#34C759",
    sender: "Slack",
    from: "noreply@slack.com",
    to: "y.adamu@student.adu.ac.ae",
    subject: "You have 2 new messages",
    time: "8:55 AM",
    isPhishing: false,
    correctAction: "delete",
    body: "You have new messages from your teammates in #general. Click to view them.",
    responses: {
      delete: {
        type: "success",
        title: "Action Correct",
        message: "Inbox cleaned safely.",
        score: 1,
      },
      report: {
        type: "warning",
        title: "False Report Submitted",
        message: "This was a legitimate Slack email.",
        score: 0,
      },
      click: {
        type: "success",
        title: "Safe Link Clicked",
        message: "Legit link. All good.",
        score: 0,
      },
    },
  },
  4: {
    id: "4",
    initial: "P",
    color: "#D73A49",
    sender: "PaayPal Service",
    from: "service@paaypal-login.com",
    to: "y.adamu@student.adu.ac.ae",
    subject: "Unusual Login Atempt - Please Verify",
    time: "Yesterday",
    isPhishing: true,
    correctAction: "report",
    body: "Suspicious login attempt. Please verify at www.paaypal-login.com/secure.",
    responses: {
      delete: {
        type: "warning",
        title: "Safe, but Not Ideal",
        message: "You avoided harm, but reporting helps more.",
        score: 0,
      },
      report: {
        type: "success",
        title: "Excellent Choice!",
        message: "Reporting protects others from this fake PayPal email.",
        score: 1,
      },
      click: {
        type: "danger",
        title: "Dangerous Link Clicked",
        message: "Fake PayPal page! You may have exposed your credentials.",
        score: -1,
      },
    },
  },
  5: {
    id: "5",
    initial: "L",
    color: "#4A90E2",
    sender: "LinkedIn",
    from: "jobs-noreply@linkedin.com",
    to: "y.adamu@student.adu.ac.ae",
    subject: "New jobs for you in Abu Dhabi",
    time: "Yesterday",
    isPhishing: false,
    correctAction: "delete",
    body: "We've found new job matches for you. Click to view them.",
    responses: {
      delete: {
        type: "success",
        title: "Action Correct",
        message: "Safe to delete real notifications.",
        score: 1,
      },
      report: {
        type: "warning",
        title: "Incorrect Report",
        message: "This was from LinkedIn. Be cautious before reporting.",
        score: 0,
      },
      click: {
        type: "success",
        title: "Safe Link Clicked",
        message: "No risk. This was a real LinkedIn message.",
        score: 0,
      },
    },
  },
  6: {
    id: "6",
    initial: "W",
    color: "#D73A49",
    sender: "Wiinner Circle",
    from: "winner@top-prizes.net",
    to: "y.adamu@student.adu.ac.ae",
    subject: "CONGRATULATIONS! You have won!",
    time: "2 days ago",
    isPhishing: true,
    correctAction: "report",
    body: "You’ve won! Submit your personal info here: www.top-prizes.net/claim",
    responses: {
      delete: {
        type: "warning",
        title: "Safe, but Not the Best",
        message: "Deleting helps you, but reporting helps others too.",
        score: 0,
      },
      report: {
        type: "success",
        title: "Excellent Choice!",
        message: "Great job! You reported a classic prize scam.",
        score: 1,
      },
      click: {
        type: "danger",
        title: "Suspicious Link Clicked",
        message: "Risky! You may be giving away sensitive data.",
        score: -1,
      },
    },
  },
  7: {
    id: "7",
    initial: "D",
    color: "#34C759",
    sender: "Dropbox",
    from: "no-reply@dropbox.com",
    to: "y.adamu@student.adu.ac.ae",
    subject: "A file has been shared with you",
    time: "3 days ago",
    isPhishing: false,
    correctAction: "delete",
    body: "You received a file from your colleague. Access it through your Dropbox.",
    responses: {
      delete: {
        type: "success",
        title: "Action Correct",
        message:
          "All good. Real file notifications can be deleted if unneeded.",
        score: 1,
      },
      report: {
        type: "warning",
        title: "False Report Submitted",
        message: "This was legitimate. Be cautious reporting known services.",
        score: 0,
      },
      click: {
        type: "success",
        title: "Safe Link Clicked",
        message: "Real link. No danger.",
        score: 0,
      },
    },
  },
  8: {
    id: "8",
    initial: "N",
    color: "#D73A49",
    sender: "Netflixx",
    from: "info@watch-netflixx.com",
    to: "y.adamu@student.adu.ac.ae",
    subject: "Your account is on hold",
    time: "4 days ago",
    isPhishing: true,
    correctAction: "report",
    body: "We couldn’t process your last payment. Update here: www.watch-netflixx.com/update-payment",
    responses: {
      delete: {
        type: "warning",
        title: "Safe, but Report Helps More",
        message: "You avoided clicking, but reporting this helps others.",
        score: 0,
      },
      report: {
        type: "success",
        title: "Correct! Phishing Detected",
        message: "You stopped a billing scam. Great catch!",
        score: 1,
      },
      click: {
        type: "danger",
        title: "Dangerous Link Clicked",
        message: "Fake payment site. Your account could be at risk.",
        score: -1,
      },
    },
  },
};

export const allThreatsData = [
  {
    id: "pulse1",
    name: "Phishing Campaign Targeting UAE Banking Users",
    description:
      "A recent phishing campaign is using fake emails pretending to be from major UAE banks. The emails contain malicious links designed to steal online banking credentials.",
    tags: ["phishing", "uae", "banking", "social-engineering"],
    severity: "High",
    indicators: [
      { type: "URL", indicator: "http://uae-bank-login.info" },
      { type: "URL", indicator: "http://secure-uae-access.com" },
      {
        type: "File Hash (SHA256)",
        indicator:
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      },
    ],
  },
  {
    id: "pulse2",
    name: "Smishing Attack Imitating Telecom Providers",
    description:
      "Users are receiving SMS messages claiming they have won a prize or have an issue with their phone bill. These messages contain links to fraudulent websites.",
    tags: ["smishing", "telecom", "mobile"],
    severity: "Medium",
    indicators: [
      { type: "URL", indicator: "http://my-etisalat-rewards.net" },
      { type: "URL", indicator: "http://du-special-offer.org" },
    ],
  },
  {
    id: "pulse3",
    name: "Ransomware Distributed via Fake Job Offers",
    description:
      "Attackers are sending fake job offers on platforms like LinkedIn with infected PDF attachments. Opening the attachment can encrypt the user's files.",
    tags: ["ransomware", "malware", "linkedin", "recruitment"],
    severity: "High",
    indicators: [
      { type: "File Name", indicator: "Job_Offer_Letter.pdf.exe" },
      { type: "Email Subject", indicator: "Urgent Job Opening - Dubai" },
    ],
  },
  {
    id: "pulse4",
    name: "Public Wi-Fi Man-in-the-Middle Attacks",
    description:
      "Threat actors are setting up fake 'Free Wi-Fi' hotspots in public areas like malls and airports to intercept data from connected users.",
    tags: ["mitm", "wi-fi", "public-network"],
    severity: "Medium",
    indicators: [
      { type: "Wi-Fi SSID", indicator: "Free_Airport_WiFi_AUH" },
      { type: "Wi-Fi SSID", indicator: "Mall_Guest_WiFi" },
    ],
  },
];

export const allLessonsData = {
  lesson1: {
    id: "lesson1",
    title: "Understanding Phishing",
    type: "video",
    duration: "8 min",
    level: "Beginner",
    icon: "Fish",
    status: "completed",
    quizId: "quiz2",
    content: {
      videoId: "dQw4w9WgXcQ", // Example YouTube Video ID
      description:
        "Phishing is a fraudulent attempt to obtain sensitive information such as usernames, passwords, and credit card details by disguising as a trustworthy entity in an electronic communication. This video provides a comprehensive overview of different phishing techniques, including spear phishing and whaling, and equips you with the essential skills to identify and report these malicious attempts, thereby safeguarding your digital identity.",
    },
  },
  lesson2: {
    id: "lesson2",
    title: "The C.I.A. Security Triad",
    type: "text-image",
    duration: "12 min",
    level: "Beginner",
    icon: "ShieldCheck",
    status: "in-progress",
    quizId: "quiz1",
    content: {
      headerImage:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=2070&auto=format&fit=crop",
      body: [
        {
          type: "text",
          value:
            "The CIA Triad is a widely-used information security model that serves as a guide for establishing security policies. The three letters stand for Confidentiality, Integrity, and Availability. These three principles are considered the core pillars of information security. A failure in any one of them can lead to significant security breaches.",
        },
        { type: "image", value: "https://i.imgur.com/2Y4aXyN.png" },
        { type: "heading", value: "1. Confidentiality" },
        {
          type: "text",
          value:
            "Confidentiality is about preventing the unauthorized disclosure of information. It's about ensuring that data is accessible only to authorized individuals. Think of it as privacy. Measures to ensure confidentiality include data encryption, two-factor authentication, and access control lists. For example, your private medical records should only be accessible by you and your authorized healthcare providers.",
        },
        { type: "heading", value: "2. Integrity" },
        {
          type: "text",
          value:
            "Integrity involves maintaining the consistency, accuracy, and trustworthiness of data. This means data cannot be modified in an unauthorized or undetected manner. To ensure integrity, systems use mechanisms like file permissions, checksums, and cryptographic hashes. For instance, when you download a file, a checksum can verify that the file has not been altered during transit.",
        },
        { type: "heading", value: "3. Availability" },
        {
          type: "text",
          value:
            "Availability ensures that information and resources are accessible to authorized users whenever they need them. This involves maintaining hardware, providing adequate bandwidth, and protecting against events that could disrupt access, such as Denial-of-Service (DoS) attacks. A common example is a website being accessible to its customers 24/7 without downtime.",
        },
      ],
    },
  },
  lesson3: {
    id: "lesson3",
    title: "Creating Strong Passwords",
    type: "text",
    duration: "10 min",
    level: "Beginner",
    icon: "Key",
    status: "in-progress",
    quizId: "quiz3",
    content: {
      headerImage:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
      body: [
        {
          type: "text",
          value:
            "A strong password is your first and most critical line of defense. While simple passwords are easy to remember, they are also easy for attackers to crack using automated tools. A robust password strategy is essential for protecting your digital life.",
        },
        { type: "heading", value: "The Pillars of a Strong Password" },
        {
          type: "text",
          value:
            "1. **Length:** Longer is stronger. Aim for a minimum of 12-14 characters. Each additional character exponentially increases the complexity for an attacker.\n\n2. **Complexity:** Use a mix of uppercase letters (A-Z), lowercase letters (a-z), numbers (0-9), and special symbols (#, $, %, &, etc.).\n\n3. **Uniqueness:** Never reuse passwords across different websites. If one site is breached, all your accounts using that password become vulnerable.",
        },
        { type: "heading", value: "Practical Tips" },
        {
          type: "text",
          value:
            "Consider using a passphrase—a sequence of random words like 'CorrectHorseBatteryStaple'—which is long and easy to remember but hard to guess. Alternatively, use a trusted password manager to generate and store highly complex, unique passwords for all your accounts. This is the recommended best practice for modern cybersecurity.",
        },
      ],
    },
  },
  lesson4: {
    id: "lesson4",
    title: "Two-Factor Authentication (2FA)",
    type: "video",
    duration: "6 min",
    level: "Intermediate",
    icon: "DeviceMobile",
    status: "in-progress",
    quizId: "quiz1",
    content: {
      videoId: "O9TE2G5t2-A",
      description:
        "Two-Factor Authentication (2FA) is a security process where users provide two different authentication factors to verify themselves. This video explains why passwords alone are no longer sufficient and demonstrates how to set up and use different types of 2FA, such as SMS codes, authenticator apps, and hardware security keys, to significantly boost your account security.",
    },
  },
  lesson5: {
    id: "lesson5",
    title: "Recognizing Social Engineering",
    type: "text-image",
    duration: "15 min",
    level: "Intermediate",
    icon: "UsersThree",
    status: "in-progress",
    quizId: "quiz2",
    content: {
      headerImage:
        "https://images.unsplash.com/photo-1558021211-6d140f9de8ce?q=80&w=1935&auto=format&fit=crop",
      body: [
        {
          type: "text",
          value:
            "Social engineering is the psychological manipulation of people into performing actions or divulging confidential information. It's a confidence trick for the digital age, and it relies on exploiting human error rather than technical vulnerabilities.",
        },
        { type: "image", value: "https://i.imgur.com/mG7gZ3L.png" },
        { type: "heading", value: "Common Tactics" },
        {
          type: "text",
          value:
            "**Baiting:** Luring users into a trap with a tempting offer, like a free movie download that is actually malware.\n\n**Pretexting:** The attacker creates a fabricated scenario (a pretext) to gain the victim's trust, such as pretending to be from the IT helpdesk to ask for a password.\n\n**Tailgating:** An attacker seeks entry to a restricted area by following closely behind a person who has legitimate access. This is a physical form of social engineering.",
        },
      ],
    },
  },
  lesson6: {
    id: "lesson6",
    title: "Understanding Malware",
    type: "text",
    duration: "12 min",
    level: "Intermediate",
    icon: "Bug",
    status: "in-progress",
    quizId: "quiz1",
    content: {
      headerImage:
        "https://images.unsplash.com/photo-1614064548237-02f9d3ed614c?q=80&w=1974&auto=format&fit=crop",
      body: [
        { type: "heading", value: "What is Malware?" },
        {
          type: "text",
          value:
            "Malware, short for malicious software, is an umbrella term for any software intentionally designed to cause disruption to a computer, server, client, or network. It can be used to steal data, bypass access controls, or otherwise cause harm to the host system.",
        },
        { type: "heading", value: "Key Types of Malware" },
        {
          type: "text",
          value:
            "**Viruses:** Attach themselves to clean files and spread to other clean files. They can lie dormant until the host file is executed.\n\n**Worms:** Can replicate themselves and spread to other computers on a network without any human interaction.\n\n**Trojans:** Disguise themselves as legitimate software to trick users into installing them. Once installed, they can create backdoors for other malware or steal information.\n\n**Ransomware:** Encrypts a victim's files and demands a ransom payment to restore access.",
        },
      ],
    },
  },
};
