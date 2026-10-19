import type { Language } from '../lib/useLanguage';

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalDocument = {
  seoTitle: string;
  seoDescription: string;
  kicker: string;
  title: string;
  draft: string;
  updated: string;
  sections: LegalSection[];
};

const privacy: Record<Language, LegalDocument> = {
  en: {
    seoTitle: 'Privacy Policy | ConvertX',
    seoDescription:
      'Draft privacy policy for convertx.biz: lead forms, event registration, resource downloads, Firebase chat, and Google Tag Manager.',
    kicker: 'Draft — needs legal review',
    title: 'Privacy Policy',
    draft:
      'This is a working draft for a Vietnam-based B2B agency website. It is not final legal advice and should be reviewed by the owner’s counsel before it is treated as the published policy. In particular, confirm the registered legal name, the retention period, and that Google Tag Manager actually follows the cookie banner.',
    updated: 'Draft date: 19 October 2026',
    sections: [
      {
        heading: 'Who this covers',
        paragraphs: [
          'ConvertX is a B2B growth and marketing agency based in District 3, Ho Chi Minh City, Vietnam. This draft describes how the public site at convertx.biz handles personal data from visitors, people who submit a form, people who download a resource, and people who use the chat widget.',
          'A later paid project is covered by its own proposal or contract, not by this website policy.',
        ],
      },
      {
        heading: 'Data the site collects',
        paragraphs: [
          'Strategy-call form: full name, work email, phone number, company name and website, and the challenge you describe.',
          'Event forms: name, work email, phone number, company, and role.',
          'Resource downloads: work email, and the title of the resource you request.',
          'Chat: email address and the message you send.',
          'Cookie preference: your analytics and marketing choice, stored in this browser by the cookie banner.',
          'Usage data: the site loads Google Tag Manager, container GTM-PLMJ498. Tags inside that container may collect pages viewed and general device or browser data. The container itself is configured outside this website repository, so this draft cannot list every tag.',
        ],
      },
      {
        heading: 'Why it is used',
        paragraphs: [
          'Lead, event, download, and chat data are used to reply to you, register you for an event you asked to join, provide the resource you requested, and keep a record of that request. Analytics, where a tag is enabled, are used to understand how the site is used. ConvertX does not sell personal data.',
        ],
      },
      {
        heading: 'Where it is stored',
        paragraphs: [
          'Form submissions are sent from your browser to a Google Apps Script web app and are expected to be stored in Google Sheets. Chat messages are written to Google Firebase Firestore, in the support_messages collection. Resource-download records are written to Firebase Firestore, in the resource_downloads collection. The cookie choice stays in localStorage on your device.',
          'Google may process this data on servers outside Vietnam. Firebase web configuration is public by design; access to stored messages and download records is limited by Firestore security rules to a verified ConvertX admin account.',
        ],
      },
      {
        heading: 'Cookies and the banner',
        paragraphs: [
          'The banner lets you accept all cookies, reject all, or save analytics and marketing separately. The preference itself is stored so the banner does not ask again. Strictly necessary storage cannot be switched off.',
          'The Tag Manager snippet is currently loaded on every page and is not switched off by the banner. Before this draft is published as final, ConvertX needs to make the tags follow that choice, or stop describing the banner as a control over analytics and marketing tags.',
        ],
      },
      {
        heading: 'How long it is kept',
        paragraphs: [
          'Proposed retention, still subject to review: inquiry, event, download, and chat records for up to 24 months after the last message, unless Vietnamese law requires a longer period. You can ask for an earlier deletion. This period is a proposal, not a decision already made by the business.',
        ],
      },
      {
        heading: 'Who it is shared with',
        paragraphs: [
          'Data is shared with Google (Apps Script, Sheets, Firebase, and Tag Manager) so the site can receive and answer requests. ConvertX does not sell or rent personal data. Staff who reply to inquiries can see the fields you submitted.',
        ],
      },
      {
        heading: 'Your requests',
        paragraphs: [
          'You can ask to access, correct, or delete the personal data you sent through the site, and you can change your cookie choice by clearing the saved preference and choosing again. Email bao.ngo@convertx.biz or call +84 908734657. We may need to confirm the request is yours.',
          'Vietnam’s personal data protection rules, including Decree 13/2023/ND-CP, should be checked against this draft before the page is treated as final. This page does not claim to be a complete statement of those rules.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: [
          'The site is written for business users. ConvertX does not knowingly collect personal data from children.',
        ],
      },
      {
        heading: 'Changes',
        paragraphs: [
          'When the practices change, this page should change with them. The date above is the draft date.',
        ],
      },
    ],
  },
  vi: {
    seoTitle: 'Chính sách bảo mật | ConvertX',
    seoDescription:
      'Bản nháp chính sách bảo mật của convertx.biz: biểu mẫu lead, đăng ký sự kiện, tải tài nguyên, chat Firebase và Google Tag Manager.',
    kicker: 'Bản nháp — cần được xem xét pháp lý',
    title: 'Chính sách bảo mật',
    draft:
      'Đây là bản nháp cho website của một agency B2B tại Việt Nam. Đây không phải tư vấn pháp lý cuối cùng và cần được chủ sở hữu cùng luật sư rà soát trước khi xem là chính sách đã ban hành. Đặc biệt cần xác nhận tên pháp lý đã đăng ký, thời gian lưu trữ, và việc Google Tag Manager có thực sự tuân theo banner cookie hay không.',
    updated: 'Ngày bản nháp: 19/10/2026',
    sections: [
      {
        heading: 'Phạm vi',
        paragraphs: [
          'ConvertX là agency tăng trưởng và marketing B2B, làm việc tại Quận 3, TP. Hồ Chí Minh, Việt Nam. Bản nháp này mô tả cách website công khai convertx.biz xử lý dữ liệu cá nhân của người truy cập, người gửi biểu mẫu, người tải tài nguyên và người dùng khung chat.',
          'Một hợp đồng dịch vụ trả phí về sau được điều chỉnh bởi đề xuất hoặc hợp đồng riêng, không phải bởi chính sách website này.',
        ],
      },
      {
        heading: 'Dữ liệu website thu thập',
        paragraphs: [
          'Biểu mẫu đặt lịch tư vấn: họ tên, email công việc, số điện thoại, tên công ty và website, cùng thách thức bạn mô tả.',
          'Biểu mẫu sự kiện: họ tên, email công việc, số điện thoại, công ty và chức vụ.',
          'Tải tài nguyên: email công việc và tên tài nguyên bạn yêu cầu.',
          'Chat: địa chỉ email và nội dung tin nhắn.',
          'Lựa chọn cookie: lựa chọn phân tích và tiếp thị của bạn, được banner cookie lưu trên trình duyệt này.',
          'Dữ liệu sử dụng: website tải Google Tag Manager, container GTM-PLMJ498. Các thẻ trong container đó có thể ghi nhận trang đã xem và thông tin chung về thiết bị hoặc trình duyệt. Container được cấu hình bên ngoài kho mã website này, nên bản nháp không liệt kê được từng thẻ.',
        ],
      },
      {
        heading: 'Mục đích sử dụng',
        paragraphs: [
          'Dữ liệu lead, sự kiện, lượt tải và chat được dùng để trả lời bạn, ghi danh sự kiện bạn yêu cầu, gửi tài nguyên bạn yêu cầu và lưu lại yêu cầu đó. Phân tích, nếu một thẻ được bật, được dùng để hiểu cách website được sử dụng. ConvertX không bán dữ liệu cá nhân.',
        ],
      },
      {
        heading: 'Nơi lưu trữ',
        paragraphs: [
          'Biểu mẫu được gửi từ trình duyệt của bạn tới một ứng dụng web Google Apps Script và dự kiến được lưu trong Google Sheets. Tin nhắn chat được ghi vào Google Firebase Firestore, collection support_messages. Bản ghi lượt tải tài nguyên được ghi vào Firebase Firestore, collection resource_downloads. Lựa chọn cookie nằm trong localStorage trên thiết bị của bạn.',
          'Google có thể xử lý dữ liệu này trên máy chủ ngoài Việt Nam. Cấu hình web của Firebase vốn được thiết kế để công khai; quyền đọc tin nhắn và bản ghi lượt tải bị giới hạn bởi security rules của Firestore cho tài khoản quản trị ConvertX đã xác minh.',
        ],
      },
      {
        heading: 'Cookie và banner',
        paragraphs: [
          'Banner cho phép chấp nhận tất cả, từ chối tất cả, hoặc lưu riêng phân tích và tiếp thị. Chính lựa chọn đó được lưu để banner không hỏi lại. Phần lưu trữ thực sự cần thiết không tắt được.',
          'Đoạn mã Tag Manager hiện được tải trên mọi trang và banner không tắt đoạn mã đó. Trước khi bản nháp này được ban hành, ConvertX cần làm cho các thẻ tuân theo lựa chọn đó, hoặc ngừng mô tả banner như một công tắc cho thẻ phân tích và tiếp thị.',
        ],
      },
      {
        heading: 'Thời gian lưu',
        paragraphs: [
          'Thời gian lưu đề xuất, vẫn chờ rà soát: hồ sơ tư vấn, sự kiện, lượt tải và chat được giữ tối đa 24 tháng kể từ lần liên hệ cuối, trừ khi pháp luật Việt Nam yêu cầu lâu hơn. Bạn có thể yêu cầu xóa sớm hơn. Đây là đề xuất, chưa phải quyết định đã chốt của doanh nghiệp.',
        ],
      },
      {
        heading: 'Bên được chia sẻ',
        paragraphs: [
          'Dữ liệu được chia sẻ với Google (Apps Script, Sheets, Firebase và Tag Manager) để website nhận và trả lời yêu cầu. ConvertX không bán hoặc cho thuê dữ liệu cá nhân. Nhân sự trả lời yêu cầu có thể xem các trường bạn đã gửi.',
        ],
      },
      {
        heading: 'Yêu cầu của bạn',
        paragraphs: [
          'Bạn có thể yêu cầu truy cập, chỉnh sửa hoặc xóa dữ liệu cá nhân đã gửi qua website, và có thể đổi lựa chọn cookie bằng cách xóa lựa chọn đã lưu rồi chọn lại. Gửi email tới bao.ngo@convertx.biz hoặc gọi +84 908734657. Chúng tôi có thể cần xác nhận yêu cầu là của bạn.',
          'Quy định bảo vệ dữ liệu cá nhân của Việt Nam, gồm Nghị định 13/2023/NĐ-CP, cần được đối chiếu với bản nháp này trước khi trang được xem là văn bản cuối. Trang này không tuyên bố đã trình bày đầy đủ các quy định đó.',
        ],
      },
      {
        heading: 'Trẻ em',
        paragraphs: [
          'Website được viết cho người dùng doanh nghiệp. ConvertX không cố ý thu thập dữ liệu cá nhân của trẻ em.',
        ],
      },
      {
        heading: 'Thay đổi',
        paragraphs: [
          'Khi cách làm thay đổi, trang này cần được cập nhật theo. Ngày ở trên là ngày của bản nháp.',
        ],
      },
    ],
  },
};

const terms: Record<Language, LegalDocument> = {
  en: {
    seoTitle: 'Terms of Service | ConvertX',
    seoDescription:
      'Draft website terms for convertx.biz. Package prices are ranges, not quotes. Paid work starts only under a separate contract.',
    kicker: 'Draft — needs legal review',
    title: 'Terms of Service',
    draft:
      'This is a working draft for use of the ConvertX website. It is not a client services agreement and it is not final legal advice. Counsel should review it before publication, including the governing-law clause and the liability limit.',
    updated: 'Draft date: 19 October 2026',
    sections: [
      {
        heading: 'These terms cover the website',
        paragraphs: [
          'These draft terms cover use of the public website at convertx.biz, run by ConvertX, a B2B growth and marketing agency in District 3, Ho Chi Minh City, Vietnam. Using the site means you have read this draft.',
          'A paid engagement starts only when you and ConvertX sign a separate proposal or contract. That document, not this page, sets scope, fees, and delivery.',
        ],
      },
      {
        heading: 'Packages and prices',
        paragraphs: [
          'Service names, inclusions, and prices on the site are the current package menu, shown in VND. A range is an indication, not a quote. The fee you pay is the fee in the written proposal. Combo prices apply only to the combinations listed with them.',
        ],
      },
      {
        heading: 'Forms, downloads, and chat',
        paragraphs: [
          'Send information that is accurate and that you are allowed to share. Do not misuse the forms, the chat, or the download step, including automated or repeated submissions, or messages that are unlawful. ConvertX may ignore or delete submissions that look like abuse.',
          'Submitting a form does not create a client relationship and does not reserve a start date.',
        ],
      },
      {
        heading: 'Resources and events',
        paragraphs: [
          'Resources and event materials are for your internal business use unless the file itself says otherwise. Do not resell them or present them as your own work. Event pages describe a specific session; registering or requesting the materials does not guarantee a seat after capacity is reached.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'The site design, the ConvertX name, and the ConvertX logo belong to ConvertX or its licensors. You keep ownership of what you type into a form or the chat. You allow ConvertX to use that content to respond to you and to operate the site.',
        ],
      },
      {
        heading: 'Other services',
        paragraphs: [
          'The site links to Google Drive, social networks, and other sites ConvertX does not operate. Their terms apply once you leave convertx.biz. Forms are sent through Google Apps Script. Chat messages and download records are stored with Google Firebase. Analytics tags load through Google Tag Manager.',
        ],
      },
      {
        heading: 'No promise of a particular result',
        paragraphs: [
          'The site is a marketing site. ConvertX does not warrant that it will be uninterrupted or free of errors. Case studies describe past work. They are not a promise that a new project will produce the same numbers. Nothing on an event or resource page is a guarantee of pipeline, revenue, or hiring.',
        ],
      },
      {
        heading: 'Liability for use of the site',
        paragraphs: [
          'To the extent Vietnamese law allows, ConvertX is not liable for loss that comes only from using the public website, including lost profits, lost data, or a decision you make from something you read here. This limit does not apply where the law forbids it, and it does not change any liability written into a signed client contract.',
        ],
      },
      {
        heading: 'Law and disputes',
        paragraphs: [
          'These draft terms are intended to be governed by the laws of Vietnam. Disputes about use of the website are intended for the courts of Ho Chi Minh City. Confirm both points with counsel before this page is published as final.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Questions about these terms: bao.ngo@convertx.biz, +84 908734657, District 3, Ho Chi Minh City.',
        ],
      },
    ],
  },
  vi: {
    seoTitle: 'Điều khoản dịch vụ | ConvertX',
    seoDescription:
      'Bản nháp điều khoản website convertx.biz. Giá các gói là khoảng giá, không phải báo giá. Công việc trả phí chỉ bắt đầu bằng hợp đồng riêng.',
    kicker: 'Bản nháp — cần được xem xét pháp lý',
    title: 'Điều khoản dịch vụ',
    draft:
      'Đây là bản nháp cho việc sử dụng website ConvertX. Đây không phải hợp đồng dịch vụ khách hàng và không phải tư vấn pháp lý cuối cùng. Luật sư nên rà soát trước khi ban hành, gồm điều khoản luật áp dụng và giới hạn trách nhiệm.',
    updated: 'Ngày bản nháp: 19/10/2026',
    sections: [
      {
        heading: 'Điều khoản này áp dụng cho website',
        paragraphs: [
          'Bản nháp này áp dụng cho việc sử dụng website công khai convertx.biz, do ConvertX vận hành. ConvertX là agency tăng trưởng và marketing B2B tại Quận 3, TP. Hồ Chí Minh, Việt Nam. Dùng website đồng nghĩa bạn đã đọc bản nháp này.',
          'Một hợp đồng trả phí chỉ bắt đầu khi bạn và ConvertX ký đề xuất hoặc hợp đồng riêng. Văn bản đó, không phải trang này, quy định phạm vi, phí và bàn giao.',
        ],
      },
      {
        heading: 'Gói dịch vụ và giá',
        paragraphs: [
          'Tên gói, hạng mục bao gồm và giá trên website là menu gói hiện tại, hiển thị bằng VND. Một khoảng giá là mức tham chiếu, không phải báo giá. Khoản phí bạn trả là khoản phí trong đề xuất bằng văn bản. Giá gói kết hợp chỉ áp dụng cho đúng tổ hợp được ghi kèm.',
        ],
      },
      {
        heading: 'Biểu mẫu, tải tài liệu và chat',
        paragraphs: [
          'Hãy gửi thông tin đúng và bạn có quyền chia sẻ. Không lạm dụng biểu mẫu, chat hoặc bước tải tài liệu, gồm gửi tự động hoặc gửi lặp, hoặc nội dung trái pháp luật. ConvertX có thể bỏ qua hoặc xóa các lượt gửi có dấu hiệu lạm dụng.',
          'Gửi biểu mẫu không tạo quan hệ khách hàng và không giữ chỗ một ngày bắt đầu.',
        ],
      },
      {
        heading: 'Tài nguyên và sự kiện',
        paragraphs: [
          'Tài nguyên và tài liệu sự kiện dành cho việc sử dụng nội bộ của doanh nghiệp bạn, trừ khi chính tệp đó nói khác. Không bán lại và không trình bày như sản phẩm của bạn. Trang sự kiện mô tả một buổi cụ thể; đăng ký hoặc xin tài liệu không bảo đảm còn chỗ khi đã đủ người.',
        ],
      },
      {
        heading: 'Sở hữu trí tuệ',
        paragraphs: [
          'Thiết kế website, tên ConvertX và logo ConvertX thuộc về ConvertX hoặc bên cấp phép. Bạn giữ quyền với nội dung mình nhập vào biểu mẫu hoặc chat. Bạn cho phép ConvertX dùng nội dung đó để trả lời bạn và vận hành website.',
        ],
      },
      {
        heading: 'Dịch vụ khác',
        paragraphs: [
          'Website liên kết tới Google Drive, mạng xã hội và các trang ConvertX không vận hành. Điều khoản của họ áp dụng khi bạn rời convertx.biz. Biểu mẫu được gửi qua Google Apps Script. Tin nhắn chat và bản ghi lượt tải được lưu trên Google Firebase. Thẻ phân tích được tải qua Google Tag Manager.',
        ],
      },
      {
        heading: 'Không cam kết một kết quả cụ thể',
        paragraphs: [
          'Website là website marketing. ConvertX không bảo đảm website hoạt động liên tục hoặc không có lỗi. Case study mô tả công việc đã làm. Chúng không phải lời hứa rằng một dự án mới sẽ ra cùng một con số. Không nội dung nào trên trang sự kiện hoặc tài nguyên là bảo đảm về phễu, doanh thu hoặc tuyển dụng.',
        ],
      },
      {
        heading: 'Trách nhiệm khi dùng website',
        paragraphs: [
          'Trong phạm vi pháp luật Việt Nam cho phép, ConvertX không chịu trách nhiệm với thiệt hại chỉ phát sinh từ việc dùng website công khai, gồm mất lợi nhuận, mất dữ liệu, hoặc quyết định bạn đưa ra từ nội dung đã đọc ở đây. Giới hạn này không áp dụng ở chỗ luật không cho phép, và không thay đổi trách nhiệm đã ghi trong hợp đồng khách hàng đã ký.',
        ],
      },
      {
        heading: 'Luật và tranh chấp',
        paragraphs: [
          'Bản nháp này dự kiến được điều chỉnh bởi pháp luật Việt Nam. Tranh chấp về việc dùng website dự kiến thuộc thẩm quyền tòa án tại TP. Hồ Chí Minh. Cần xác nhận cả hai điểm với luật sư trước khi trang này được ban hành.',
        ],
      },
      {
        heading: 'Liên hệ',
        paragraphs: [
          'Câu hỏi về điều khoản: bao.ngo@convertx.biz, +84 908734657, Quận 3, TP. Hồ Chí Minh.',
        ],
      },
    ],
  },
};

export function getPrivacy(lang: Language): LegalDocument {
  return privacy[lang];
}

export function getTerms(lang: Language): LegalDocument {
  return terms[lang];
}
