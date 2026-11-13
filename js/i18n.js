/* Language switcher: EN / JP / KO. Add or edit text in the dictionaries below. */
(() => {
  'use strict';
  const D = {
    en: {
      menu: 'Menu', skip: 'Skip to content', 'auth.signin': 'Sign in', 'auth.signout': 'Sign out',
      'nav.design': 'Web Design', 'nav.services': 'Services', 'nav.pricing': 'Pricing', 'nav.works': 'Gallery & Works', 'pricing.h2': 'Project pricing', 'pricing.lead': 'Pick a starting scope. Final prices are confirmed in your quote.', 'pricing.starter': 'Starter', 'pricing.business': 'Business', 'pricing.custom': 'Custom', 'pricing.quote': 'Custom quote', 'pricing.starter.items': 'One-page website|Responsive layout|Contact form', 'pricing.business.items': 'Up to five pages|Services or portfolio|Contact form and SEO basics', 'pricing.custom.items': 'Online shop or custom features|Project scope and milestones|Maintenance options', 'pricing.payment.note': 'Checkout buttons are ready to connect after you set your prices and secure payment endpoints.', 'pricing.checkout.unconfigured': 'Checkout is not connected yet. Add your secure Stripe or Payoneer endpoint.', 'pricing.checkout.error': 'Checkout could not start. Please try again or contact L JAI.',
      'hero.h1': 'Websites sketched by hand, then built properly.', 'hero.visual': 'Design that stands out.', 'hero.disciplines': 'Brand · Web · Digital',
      'hero.p': 'L JAI is a web design and development studio. Every project starts as a drawing on paper and ends as fast, accessible, hand-coded pages.',
      'hero.cta1': 'See the work', 'hero.cta2': 'Start a project', 'hero.note': 'Thoughtful design, made to work.',
      'design.h2': 'Web design that starts on paper',
      'design.p': 'A pen is faster than any design tool. I sketch the layout with you first, so we argue about ideas instead of pixels, then move to code only when the shape feels right.',
      'st1.h': 'Sketch', 'st1.p': 'Pages, flow and content drawn on paper and photographed for your review.',
      'st2.h': 'Wireframe', 'st2.p': 'A clickable grey-box version, so you can test the structure on your phone.',
      'st3.h': 'Build', 'st3.p': 'Clean HTML, CSS and JavaScript. No bloated page builders.',
      'st4.h': 'Launch', 'st4.p': 'Testing on real devices, then publishing and handover.',
      'svc.h2': 'Services',
      'sv1.h': 'Web design', 'sv1.p': 'Layouts, type and colour that fit your business, delivered as a mockup you can click through.', 'sv1.t': 'Sketches|Wireframes|Brand styling',
      'sv2.h': 'Web development', 'sv2.p': 'Responsive, accessible sites that load quickly on slow connections and small screens.', 'sv2.t': 'HTML, CSS, JS|Forms|SEO basics',
      'sv3.h': 'Care plans', 'sv3.p': 'Hosting, backups and small monthly edits, so your site stays current without extra work for you.', 'sv3.t': 'Hosting|Updates|Backups',
      'works.h2': 'Gallery & works', 'works.lead': 'Sample projects. Replace them with your own in js/main.js.', 'works.filter': 'Filter projects',
      'type.All': 'All', 'type.Business': 'Business', 'type.Portfolio': 'Portfolio', 'type.Shop': 'Shop', sep: '. ', wire: 'Wireframe of ',
      w1: 'Menu, hours and online reservations for a neighbourhood cafe.', w2: 'Full-screen image gallery with fast loading and a booking form.',
      w3: 'Small catalogue and order form for handmade home goods.', w4: 'Clear service pages, clinic map and appointment requests.',
      w5: 'Case-study layout for an illustrator, with a printable CV.', w6: 'Weekend market vendor directory with search and filters.',
      'contact.h2': 'Start a project', 'contact.p': 'Tell me what you need and when. I reply within two working days with questions or a rough plan.',
      'f.name': 'Name', 'f.email': 'Email', 'f.type': 'Project type', 'f.msg': 'Message', 'f.pw': 'Password', 'auth.identifier': 'Username / email', 'f.username': 'Username', 'f.birthday': 'Birthday', 'f.address': 'Address',
      'opt.new': 'New website', 'opt.redo': 'Redesign', 'opt.shop': 'Online shop', 'opt.unsure': 'Not sure yet', send: 'Send message',
      'err.name': 'Enter your name.', 'err.email': 'Enter a valid email address.', 'err.msg': 'Write at least a short sentence about your project.',
      'ok.sent': 'Your email app should open with the message ready to send.',
      'title.in': 'Sign in', 'title.up': 'Create account', 'title.update': 'Choose a new password', 'btn.in': 'Sign in', 'btn.up': 'Create account', 'btn.update': 'Save new password',
      'sw.up': 'Create an account instead', 'sw.in': 'I already have an account',
      'err.pw': 'Use a password of at least 6 characters.', 'auth.failed': 'Authentication failed. Please try again.', 'auth.unconfigured': 'Connect your Supabase client to enable sign-in and account creation.', 'auth.reset.sent': 'If that email belongs to an account, a password reset link will be sent.', 'auth.username.short': 'Username must be at least 3 characters.', 'auth.profile.required': 'Add your birthday and address to continue.', 'auth.check.email': 'Check your email to confirm your account.', 'auth.username.lookup': 'Username sign-in needs a secure Supabase username lookup; use your email for now.', 'auth.password.updated': 'Your password has been updated.',  'err.exists': 'That email already has an account. Sign in instead.', 'forgot': 'Forgot password?', 'title.reset': 'Reset password', 'btn.reset': 'Reset password', 'f.newpw': 'New password', 'sw.back': 'Back to sign in', 'err.noacct': 'No account found for that email.', 'ok.reset': 'Password updated. You can sign in now.', 'err.bad': 'Email or password is incorrect.',
      'orb.design': 'web design', 'orb.dev': 'development', 'orb.gallery': 'gallery & works', 'orb.start': 'start a project',
      'p.design.t': 'Web design', 'p.design.p': 'Sketches, wireframes and a visual style that fits your business.', 'p.design.l': 'Paper sketches of every page|Clickable mockup|Colour and type system', 'p.design.a': 'See the process',
      'p.dev.t': 'Web development', 'p.dev.p': 'Hand-coded, responsive sites that stay fast on slow connections.', 'p.dev.l': 'Accessible HTML and CSS|Contact forms that work|Basic SEO included', 'p.dev.a': 'See the services',
      'p.gallery.t': 'Gallery & works', 'p.gallery.p': 'A selection of sample projects across business, portfolio and shop sites.', 'p.gallery.l': 'Filter by project type|Each one sketched first', 'p.gallery.a': 'Open the gallery',
      'p.start.t': 'Start a project', 'p.start.p': 'Send a short brief and I will reply within two working days.', 'p.start.l': 'Free first conversation|Fixed quote before any work', 'p.start.a': 'Write to L JAI'
    },
    ja: {
      menu: 'メニュー', skip: '本文へスキップ', 'auth.signin': 'ログイン', 'auth.signout': 'ログアウト',
      'nav.design': 'Webデザイン', 'nav.services': 'サービス', 'nav.pricing': '料金', 'nav.works': 'ギャラリー＆実績', 'pricing.h2': 'プロジェクト料金', 'pricing.lead': 'ご希望の範囲をお選びください。最終金額はお見積もりでご案内します。', 'pricing.starter': 'スターター', 'pricing.business': 'ビジネス', 'pricing.custom': 'カスタム', 'pricing.quote': '個別お見積もり', 'pricing.starter.items': '1ページのウェブサイト|レスポンシブレイアウト|お問い合わせフォーム', 'pricing.business.items': '最大5ページ|サービスまたはポートフォリオ|フォームと基本SEO', 'pricing.custom.items': 'オンラインショップまたはカスタム機能|範囲とマイルストーン|保守オプション', 'pricing.payment.note': '料金と安全な決済エンドポイントを設定すると決済ボタンを接続できます。', 'pricing.checkout.unconfigured': '決済は未接続です。StripeまたはPayoneerの安全なエンドポイントを設定してください。', 'pricing.checkout.error': '決済を開始できませんでした。再試行するかL JAIへお問い合わせください。',
      'hero.h1': '手描きでスケッチし、丁寧に作るウェブサイト。', 'hero.visual': 'デザインで、目立つ。', 'hero.disciplines': 'ブランド · Web · デジタル',
      'hero.p': 'L JAIはウェブデザイン・開発スタジオです。すべてのプロジェクトは紙の上のスケッチから始まり、高速でアクセシブルな手書きコードのページとして完成します。',
      'hero.cta1': '実績を見る', 'hero.cta2': 'プロジェクトを始める', 'hero.note': '考え抜かれた、使いやすいデザイン。',
      'design.h2': '紙から始めるウェブデザイン',
      'design.p': 'ペンはどんなデザインツールよりも速いです。まず一緒にレイアウトをスケッチし、ピクセルではなくアイデアについて話し合います。形が固まってからコードに移ります。',
      'st1.h': 'スケッチ', 'st1.p': 'ページ構成・導線・コンテンツを紙に描き、写真にしてご確認いただきます。',
      'st2.h': 'ワイヤーフレーム', 'st2.p': 'グレーのボックスで作るクリックできる試作版。スマートフォンで構成を確認できます。',
      'st3.h': '制作', 'st3.p': 'クリーンなHTML、CSS、JavaScriptで制作します。重いページビルダーは使いません。',
      'st4.h': '公開', 'st4.p': '実機でテストし、公開と引き渡しまで行います。',
      'svc.h2': 'サービス',
      'sv1.h': 'ウェブデザイン', 'sv1.p': 'ビジネスに合ったレイアウト、書体、色を、クリックして確認できるモックアップでお届けします。', 'sv1.t': 'スケッチ|ワイヤーフレーム|ブランドスタイル',
      'sv2.h': 'ウェブ開発', 'sv2.p': '遅い回線や小さな画面でも素早く表示される、レスポンシブでアクセシブルなサイトを作ります。', 'sv2.t': 'HTML・CSS・JS|フォーム|SEOの基本',
      'sv3.h': '保守プラン', 'sv3.p': 'ホスティング、バックアップ、毎月の小さな更新を担当し、手間なくサイトを最新に保ちます。', 'sv3.t': 'ホスティング|更新|バックアップ',
      'works.h2': 'ギャラリー＆実績', 'works.lead': 'サンプルプロジェクトです。js/main.js で自分の作品に置き換えてください。', 'works.filter': 'プロジェクトを絞り込む',
      'type.All': 'すべて', 'type.Business': 'ビジネス', 'type.Portfolio': 'ポートフォリオ', 'type.Shop': 'ショップ', sep: '。', wire: 'ワイヤーフレーム：',
      w1: '近所のカフェのメニュー、営業時間、オンライン予約。', w2: '高速に読み込まれる全画面ギャラリーと予約フォーム。',
      w3: 'ハンドメイド雑貨の小さなカタログと注文フォーム。', w4: '分かりやすい診療案内、クリニックの地図、予約リクエスト。',
      w5: 'イラストレーター向けのケーススタディ型レイアウトと印刷用履歴書。', w6: '検索とフィルター付きの週末マーケット出店者ディレクトリ。',
      'contact.h2': 'プロジェクトを始める', 'contact.p': 'ご要望と希望時期をお知らせください。2営業日以内に、ご質問または大まかなプランをお返しします。',
      'f.name': 'お名前', 'f.email': 'メールアドレス', 'f.type': 'プロジェクトの種類', 'f.msg': 'メッセージ', 'f.pw': 'パスワード', 'auth.identifier': 'ユーザー名 / メールアドレス', 'f.username': 'ユーザー名', 'f.birthday': '誕生日', 'f.address': '住所',
      'opt.new': '新規ウェブサイト', 'opt.redo': 'リニューアル', 'opt.shop': 'オンラインショップ', 'opt.unsure': 'まだ未定', send: 'メッセージを送信',
      'err.name': 'お名前を入力してください。', 'err.email': '有効なメールアドレスを入力してください。', 'err.msg': 'プロジェクトについて、短くても文章で書いてください。',
      'ok.sent': 'メールアプリが開き、送信準備の整ったメッセージが表示されます。',
      'title.in': 'ログイン', 'title.up': 'アカウント作成', 'title.update': '新しいパスワード', 'btn.in': 'ログイン', 'btn.up': 'アカウントを作成', 'btn.update': '新しいパスワードを保存',
      'sw.up': '代わりにアカウントを作成する', 'sw.in': 'すでにアカウントをお持ちの方',
      'err.pw': 'パスワードは6文字以上にしてください。', 'auth.failed': '認証に失敗しました。もう一度お試しください。', 'auth.unconfigured': 'サインインとアカウント作成を有効にするには、Supabaseクライアントを接続してください。', 'auth.reset.sent': 'アカウントがある場合、パスワード再設定リンクを送信します。', 'auth.username.short': 'ユーザー名は3文字以上で入力してください。', 'auth.profile.required': '誕生日と住所を入力してください。', 'auth.check.email': 'メールを確認してアカウントを有効にしてください。', 'auth.username.lookup': 'ユーザー名でログインするには安全なSupabase検索設定が必要です。メールアドレスをお使いください。', 'auth.password.updated': 'パスワードを更新しました。',  'err.exists': 'このメールアドレスはすでに登録されています。ログインしてください。', 'forgot': 'パスワードをお忘れですか？', 'title.reset': 'パスワードの再設定', 'btn.reset': 'パスワードを再設定', 'f.newpw': '新しいパスワード', 'sw.back': 'ログインに戻る', 'err.noacct': 'このメールアドレスのアカウントが見つかりません。', 'ok.reset': 'パスワードを更新しました。ログインできます。', 'err.bad': 'メールアドレスまたはパスワードが正しくありません。',
      'orb.design': 'Webデザイン', 'orb.dev': '開発', 'orb.gallery': 'ギャラリー＆実績', 'orb.start': 'プロジェクトを始める',
      'p.design.t': 'ウェブデザイン', 'p.design.p': 'スケッチ、ワイヤーフレーム、ビジネスに合ったビジュアルスタイル。', 'p.design.l': '紙に描く全ページのスケッチ|クリックできるモックアップ|色と書体のシステム', 'p.design.a': '制作の流れを見る',
      'p.dev.t': 'ウェブ開発', 'p.dev.p': '遅い回線でも速い、手書きコードのレスポンシブなサイト。', 'p.dev.l': 'アクセシブルなHTMLとCSS|きちんと動くお問い合わせフォーム|基本的なSEO込み', 'p.dev.a': 'サービスを見る',
      'p.gallery.t': 'ギャラリー＆実績', 'p.gallery.p': 'ビジネス、ポートフォリオ、ショップのサンプルプロジェクト集。', 'p.gallery.l': 'プロジェクトの種類で絞り込み|すべてスケッチから制作', 'p.gallery.a': 'ギャラリーを開く',
      'p.start.t': 'プロジェクトを始める', 'p.start.p': '簡単な依頼内容をお送りください。2営業日以内に返信します。', 'p.start.l': '初回相談は無料|作業前に固定見積もり', 'p.start.a': 'L JAIに連絡する'
    },
    ko: {
      menu: '메뉴', skip: '본문으로 건너뛰기', 'auth.signin': '로그인', 'auth.signout': '로그아웃',
      'nav.design': '웹 디자인', 'nav.services': '서비스', 'nav.pricing': '가격', 'nav.works': '갤러리 & 작업', 'pricing.h2': '프로젝트 가격', 'pricing.lead': '원하는 작업 범위를 선택하세요. 최종 금액은 견적에서 확정됩니다.', 'pricing.starter': '스타터', 'pricing.business': '비즈니스', 'pricing.custom': '맞춤형', 'pricing.quote': '맞춤 견적', 'pricing.starter.items': '원페이지 웹사이트|반응형 레이아웃|문의 양식', 'pricing.business.items': '최대 5페이지|서비스 또는 포트폴리오|문의 양식과 기본 SEO', 'pricing.custom.items': '온라인 쇼핑몰 또는 맞춤 기능|범위 및 일정|유지 관리 옵션', 'pricing.payment.note': '가격과 안전한 결제 엔드포인트를 설정하면 결제 버튼을 연결할 수 있습니다.', 'pricing.checkout.unconfigured': '결제가 아직 연결되지 않았습니다. Stripe 또는 Payoneer의 안전한 엔드포인트를 설정하세요.', 'pricing.checkout.error': '결제를 시작하지 못했습니다. 다시 시도하거나 L JAI에 문의하세요.',
      'hero.h1': '손으로 스케치하고, 제대로 만드는 웹사이트.', 'hero.visual': '디자인으로, 눈에 띄게.', 'hero.disciplines': '브랜드 · 웹 · 디지털',
      'hero.p': 'L JAI는 웹 디자인 및 개발 스튜디오입니다. 모든 프로젝트는 종이 위의 스케치에서 시작해, 빠르고 접근성 좋은 직접 코딩한 페이지로 완성됩니다.',
      'hero.cta1': '작업 보기', 'hero.cta2': '프로젝트 시작하기', 'hero.note': '세심한 디자인, 제대로 작동하게.',
      'design.h2': '종이에서 시작하는 웹 디자인',
      'design.p': '펜은 어떤 디자인 툴보다 빠릅니다. 먼저 함께 레이아웃을 스케치해서 픽셀이 아니라 아이디어를 논의하고, 형태가 잡히면 코드로 넘어갑니다.',
      'st1.h': '스케치', 'st1.p': '페이지 구성, 흐름, 콘텐츠를 종이에 그려 사진으로 검토해 드립니다.',
      'st2.h': '와이어프레임', 'st2.p': '회색 박스로 만든 클릭 가능한 버전으로 휴대폰에서 구조를 테스트할 수 있습니다.',
      'st3.h': '제작', 'st3.p': '깔끔한 HTML, CSS, JavaScript로 만듭니다. 무거운 페이지 빌더는 쓰지 않습니다.',
      'st4.h': '런칭', 'st4.p': '실제 기기에서 테스트한 뒤 게시와 인수인계까지 진행합니다.',
      'svc.h2': '서비스',
      'sv1.h': '웹 디자인', 'sv1.p': '비즈니스에 맞는 레이아웃, 서체, 색상을 클릭해 볼 수 있는 목업으로 전달합니다.', 'sv1.t': '스케치|와이어프레임|브랜드 스타일',
      'sv2.h': '웹 개발', 'sv2.p': '느린 연결과 작은 화면에서도 빠르게 로드되는 반응형, 접근성 좋은 사이트를 만듭니다.', 'sv2.t': 'HTML, CSS, JS|폼|SEO 기본',
      'sv3.h': '관리 플랜', 'sv3.p': '호스팅, 백업, 매달 소규모 수정을 맡아 별도 수고 없이 사이트를 최신으로 유지합니다.', 'sv3.t': '호스팅|업데이트|백업',
      'works.h2': '갤러리 & 작업', 'works.lead': '샘플 프로젝트입니다. js/main.js에서 직접 만든 작업으로 교체하세요.', 'works.filter': '프로젝트 필터',
      'type.All': '전체', 'type.Business': '비즈니스', 'type.Portfolio': '포트폴리오', 'type.Shop': '쇼핑몰', sep: '. ', wire: '와이어프레임: ',
      w1: '동네 카페의 메뉴, 영업시간, 온라인 예약.', w2: '빠르게 로드되는 전체 화면 이미지 갤러리와 예약 폼.',
      w3: '수공예 생활용품을 위한 소규모 카탈로그와 주문 폼.', w4: '알기 쉬운 진료 안내, 병원 지도, 예약 요청.',
      w5: '일러스트레이터를 위한 사례 연구형 레이아웃과 인쇄용 이력서.', w6: '검색과 필터를 갖춘 주말 마켓 판매자 디렉터리.',
      'contact.h2': '프로젝트 시작하기', 'contact.p': '필요한 내용과 희망 시기를 알려 주세요. 영업일 기준 2일 이내에 질문 또는 대략적인 계획으로 답장드립니다.',
      'f.name': '이름', 'f.email': '이메일', 'f.type': '프로젝트 유형', 'f.msg': '메시지', 'f.pw': '비밀번호', 'auth.identifier': '사용자 이름 / 이메일', 'f.username': '사용자 이름', 'f.birthday': '생일', 'f.address': '주소',
      'opt.new': '새 웹사이트', 'opt.redo': '리디자인', 'opt.shop': '온라인 쇼핑몰', 'opt.unsure': '아직 모르겠어요', send: '메시지 보내기',
      'err.name': '이름을 입력해 주세요.', 'err.email': '올바른 이메일 주소를 입력해 주세요.', 'err.msg': '프로젝트에 대해 짧게라도 한 문장 이상 적어 주세요.',
      'ok.sent': '이메일 앱이 열리고 보낼 메시지가 준비됩니다.',
      'title.in': '로그인', 'title.up': '계정 만들기', 'title.update': '새 비밀번호 설정', 'btn.in': '로그인', 'btn.up': '계정 만들기', 'btn.update': '새 비밀번호 저장',
      'sw.up': '대신 계정 만들기', 'sw.in': '이미 계정이 있어요',
      'err.pw': '비밀번호는 6자 이상이어야 합니다.', 'auth.failed': '인증에 실패했습니다. 다시 시도해 주세요.', 'auth.unconfigured': '로그인과 계정 생성을 사용하려면 Supabase 클라이언트를 연결하세요.', 'auth.reset.sent': '계정이 있으면 비밀번호 재설정 링크를 보냅니다.', 'auth.username.short': '사용자 이름은 3자 이상이어야 합니다.', 'auth.profile.required': '생일과 주소를 입력해 주세요.', 'auth.check.email': '이메일을 확인하여 계정을 인증하세요.', 'auth.username.lookup': '사용자 이름으로 로그인하려면 안전한 Supabase 조회 설정이 필요합니다. 이메일을 사용해 주세요.', 'auth.password.updated': '비밀번호를 변경했습니다.',  'err.exists': '이 이메일은 이미 계정이 있습니다. 로그인해 주세요.', 'forgot': '비밀번호를 잊으셨나요?', 'title.reset': '비밀번호 재설정', 'btn.reset': '비밀번호 재설정', 'f.newpw': '새 비밀번호', 'sw.back': '로그인으로 돌아가기', 'err.noacct': '이 이메일로 등록된 계정이 없습니다.', 'ok.reset': '비밀번호가 변경되었습니다. 이제 로그인할 수 있습니다.', 'err.bad': '이메일 또는 비밀번호가 올바르지 않습니다.',
      'orb.design': '웹 디자인', 'orb.dev': '개발', 'orb.gallery': '갤러리 & 작업', 'orb.start': '프로젝트 시작하기',
      'p.design.t': '웹 디자인', 'p.design.p': '스케치, 와이어프레임, 비즈니스에 어울리는 비주얼 스타일.', 'p.design.l': '모든 페이지의 종이 스케치|클릭 가능한 목업|색상 및 서체 시스템', 'p.design.a': '진행 과정 보기',
      'p.dev.t': '웹 개발', 'p.dev.p': '느린 연결에서도 빠른, 직접 코딩한 반응형 사이트.', 'p.dev.l': '접근성 좋은 HTML과 CSS|제대로 작동하는 문의 폼|기본 SEO 포함', 'p.dev.a': '서비스 보기',
      'p.gallery.t': '갤러리 & 작업', 'p.gallery.p': '비즈니스, 포트폴리오, 쇼핑몰 사이트 샘플 프로젝트 모음.', 'p.gallery.l': '프로젝트 유형별 필터|모두 스케치부터 시작', 'p.gallery.a': '갤러리 열기',
      'p.start.t': '프로젝트 시작하기', 'p.start.p': '간단한 의뢰서를 보내 주시면 영업일 기준 2일 이내에 답장드립니다.', 'p.start.l': '첫 상담 무료|작업 전 고정 견적', 'p.start.a': 'L JAI에 문의하기'
    }
  };
  const KEY = 'jpk-lang';
  let lang = 'en';
  try { const s = localStorage.getItem(KEY); if (D[s]) lang = s; } catch {}
  const q = (s) => [...document.querySelectorAll(s)];
  window.t = k => (D[lang] && D[lang][k]) ?? D.en[k] ?? k;
  window.applyI18n = () => {
    document.documentElement.lang = lang;
    q('[data-i18n]').forEach(el => { el.textContent = window.t(el.dataset.i18n); });
    q('[data-i18n-list]').forEach(el => { el.innerHTML = window.t(el.dataset.i18nList).split('|').map(x => `<li>${x}</li>`).join(''); });
    q('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', window.t(el.dataset.i18nAria)));
    q('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
  };
  q('.lang button').forEach(b => b.addEventListener('click', () => {
    lang = b.dataset.lang;
    try { localStorage.setItem(KEY, lang); } catch {}
    window.applyI18n(); dispatchEvent(new Event('langchange'));
  }));
})();
