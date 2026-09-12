/* ==========================================================================
   耀星塔羅 ✦ YAOXING TAROT 核心邏輯 (script.js)
   品牌標語：黑夜漫漫，耀星為你指引航向。
   包含：四大命運主題 (情感與關係、工作與事業、金錢與財運、其他問題) 與自訂問題輸入框、
   100% 正向積極、極致詳細多維度「耀星塔羅 ‧ 耀星引航」解牌庫、
   Web Audio API 晶瑩仙境神祕旋律 BGM、親自擇牌扇形展開、大阿爾克那圖鑑與日誌
   ========================================================================== */

// --- 22 大阿爾克那完整資料庫 (全數優化為正向積極、啟發成長的溫暖解牌) ---
const TAROT_DECK = [
  {
    id: 0,
    roman: "0",
    name_zh: "愚者",
    name_en: "THE FOOL",
    image: "assets/cards/card_00_fool.jpg",
    element: "風元素 (Air)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><circle cx="50" cy="40" r="20" stroke="#d4af37" stroke-width="2" fill="none"/><path d="M50 15 L50 65 M30 40 L70 40" stroke="#f7e7a1" stroke-width="1.5"/><polygon points="50,75 40,90 60,90" fill="#d4af37"/><circle cx="50" cy="40" r="6" fill="#f7e7a1"/></svg>`,
    upright: {
      keywords: "新起點、冒險、純真、無限可能、勇氣",
      meaning: "象徵著一個全新的美好旅程即將展開！你懷抱著純粹的熱情與無畏的勇氣，前方充滿無限希望。相信直覺，勇敢邁出自信的第一步。",
      advice: "保持開放與好奇心，勇於踏出舒適圈，耀星正全心全意為你指引最佳的航向與豐盛。"
    },
    reversed: {
      keywords: "沉澱蓄勢、深思熟慮、調整步伐、重整旗鼓",
      meaning: "宇宙提醒你在飛躍前稍微放慢腳步，這是一次寶貴的沉澱與深思機會。稍微梳理目標後再出發，你的每一步將走得更加穩健踏實。",
      advice: "給自己多一點耐心與充實時間，在展翅高飛之前先奠定好堅實的基石。"
    }
  },
  {
    id: 1,
    roman: "I",
    name_zh: "魔術師",
    name_en: "THE MAGICIAN",
    image: "assets/cards/card_01_magician.jpg",
    element: "風元素 (Air)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><path d="M30 40 C30 30 45 30 50 40 C55 30 70 30 70 40 C70 50 55 50 50 40 C45 50 30 50 30 40 Z" stroke="#d4af37" stroke-width="2" fill="none"/><line x1="50" y1="55" x2="50" y2="85" stroke="#f7e7a1" stroke-width="2"/><polygon points="50,15 45,25 55,25" fill="#f7e7a1"/></svg>`,
    upright: {
      keywords: "創造力、顯化、資源整合、顯赫才華、掌控力",
      meaning: "你擁有了實現願景所需的一切天賦與資源！專注力與溝通魅力正處於巔峰狀態，這是將美好想法轉化為耀眼現實的強大時刻。",
      advice: "勇敢展現你的個人影響力，運用你的才智主動創造屬於你的亮眼好運。"
    },
    reversed: {
      keywords: "潛能待發、專注核心、內在蓄能、突破盲點",
      meaning: "你擁有強大的潛能正等待被徹底點燃！此時適合先將精力重新集中在最核心的目標上，排除外界雜音，你的才華很快就會光芒四射。",
      advice: "堅定相信自己的天賦，釐清優先順序，將注意力凝聚在真正有價值的事物上。"
    }
  },
  {
    id: 2,
    roman: "II",
    name_zh: "女祭司",
    name_en: "THE HIGH PRIESTESS",
    image: "assets/cards/card_02_priestess.jpg",
    element: "水元素 (Water)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><path d="M35 30 A20 20 0 0 0 35 70 A25 25 0 0 1 35 30 Z" fill="#d4af37"/><circle cx="60" cy="50" r="18" stroke="#f7e7a1" stroke-width="2" fill="none"/><line x1="50" y1="20" x2="50" y2="80" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="3,3"/></svg>`,
    upright: {
      keywords: "直覺、潛意識、智慧、冷靜沈思、神秘女力",
      meaning: "女祭司象徵著內在的深層智慧與靈敏直覺。答案就在你沉靜的內心中，傾聽你的第一直覺，它將帶引你走在最正確的道路上。",
      advice: "給自己品質極高的獨處時間，保持優雅與沉穩，信任你內在無比精準的智慧。"
    },
    reversed: {
      keywords: "傾聽內心、溫柔關懷、自我連結、靜心修復",
      meaning: "提醒你暫時遠離外界的繁雜喧囂，重新溫柔地擁抱與關懷自己的真實感受。當你與自己心靈連結時，直覺與勇氣將重新充盈。",
      advice: "對自己多一份溫柔與體貼，承認內心的真實需求，在安靜中重獲明晰力量。"
    }
  },
  {
    id: 3,
    roman: "III",
    name_zh: "女皇",
    name_en: "THE EMPRESS",
    image: "assets/cards/card_03_empress.jpg",
    element: "土元素 (Earth)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><circle cx="50" cy="40" r="22" stroke="#d4af37" stroke-width="2" fill="none"/><path d="M50 62 L50 90 M38 75 L62 75" stroke="#f7e7a1" stroke-width="2"/><path d="M35 32 Q50 15 65 32" stroke="#d4af37" stroke-width="1.5" fill="none"/></svg>`,
    upright: {
      keywords: "豐盛、愛與美、孕育、極致享受、奢華與滋養",
      meaning: "代表著物質與心靈的雙重豐盛美滿！不論在情感、事業或生活品質上，你都迎來了充滿創造力與喜悅的甘霖收穫期。",
      advice: "盡情體驗生活的精緻與美好，大方給予自己與身邊的人溫暖的愛與滋養。"
    },
    reversed: {
      keywords: "自我滋養、寵愛自己、建立邊界、回歸豐盛",
      meaning: "這是一張溫馨的提醒牌，鼓勵你在關心他人的同時，更要好好寵愛與滋養自己。當你先把自己的能量補滿，豐盛自然隨之流轉。",
      advice: "建立健康優雅的生活邊界，好好獎勵自己的付出，找回內心豐富的安全感。"
    }
  },
  {
    id: 4,
    roman: "IV",
    name_zh: "皇帝",
    name_en: "THE EMPEROR",
    image: "assets/cards/card_04_emperor.jpg",
    element: "火元素 (Fire)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><rect x="30" y="30" width="40" height="40" stroke="#d4af37" stroke-width="2" fill="none"/><path d="M50 15 L50 85 M20 50 L80 50" stroke="#f7e7a1" stroke-width="1.5"/><circle cx="50" cy="50" r="8" fill="#d4af37"/></svg>`,
    upright: {
      keywords: "領導力、秩序、堅定自信、事業基石、專業權威",
      meaning: "皇帝象徵著穩固的結構與優秀的領導魅力。憑藉理性思考與堅強意志，你能為事業或生活建立起無堅不摧的成功秩序。",
      advice: "定下明確美好的目標，以專業與自信的態度引導局勢，穩步邁向榮耀成功。"
    },
    reversed: {
      keywords: "彈性調整、圓融溝通、包容授權、穩健前行",
      meaning: "提醒你展現領導力時兼具柔軟與彈性。以優雅的包容心聽取不同意見，適度授權團隊，會讓你的事業格局更加寬廣大氣。",
      advice: "結合理性與溫柔包容的力量，以圓融智慧溝通，事業將迎來更穩健的躍升。"
    }
  },
  {
    id: 5,
    roman: "V",
    name_zh: "教皇",
    name_en: "THE HIEROPHANT",
    image: "assets/cards/card_05_hierophant.jpg",
    element: "土元素 (Earth)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><path d="M30 30 L70 30 M38 45 L62 45 M45 60 L55 60" stroke="#d4af37" stroke-width="2.5"/><line x1="50" y1="20" x2="50" y2="85" stroke="#f7e7a1" stroke-width="2"/></svg>`,
    upright: {
      keywords: "智慧傳承、貴人相助、導師指引、心靈契約",
      meaning: "代表著智慧傳承與強大的貴人相助運！你將獲得前輩、導師或專業機構的寶貴幫助與讚賞，在穩健架構中迅速成長。",
      advice: "尊重前人的成功經驗，積極尋求專業協助與貴人共識，你的努力將獲得眾人肯定。"
    },
    reversed: {
      keywords: "獨立思考、突破框架、創新思維、相信自我",
      meaning: "鼓勵你勇敢跳脫舊有的框架與思維習慣！你擁有獨立思考的優秀才華，是時候展現專屬於你的獨特創新見解了。",
      advice: "相信自己的獨特信念，不盲從既定規則，勇敢開創專屬於你的嶄新道路。"
    }
  },
  {
    id: 6,
    roman: "VI",
    name_zh: "戀人",
    name_en: "THE LOVERS",
    image: "assets/cards/card_06_lovers.jpg",
    element: "風元素 (Air)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><path d="M30 40 A15 15 0 0 1 50 50 A15 15 0 0 1 70 40 A15 15 0 0 1 50 65 A15 15 0 0 1 30 40 Z" fill="none" stroke="#d4af37" stroke-width="2"/><circle cx="50" cy="30" r="5" fill="#f7e7a1"/></svg>`,
    upright: {
      keywords: "和諧連結、美好選擇、深度共鳴、價值融合",
      meaning: "代表著極具默契的美好情感連結與和諧關係！不論在真摯愛情或事業上的黃金合作夥伴，都將帶來令人心喜的共鳴。",
      advice: "以誠實與真心回應當前關係，做出符合你核心價值的選擇，迎接美好愛的共振。"
    },
    reversed: {
      keywords: "誠實溝通、價值重整、用心連結、選擇真我",
      meaning: "這是一次加深彼此理解的好時機！透過坦誠溝通與重新確認彼此的優先順序，你能更清楚知道自己真正珍視的幸福模樣。",
      advice: "誠實審視內心真正的渴望，勇敢溝通表達需求，和諧幸福的解答就在眼前。"
    }
  },
  {
    id: 7,
    roman: "VII",
    name_zh: "戰車",
    name_en: "THE CHARIOT",
    image: "assets/cards/card_07_chariot.jpg",
    element: "水元素 (Water)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><polygon points="50,15 85,80 15,80" stroke="#d4af37" stroke-width="2" fill="none"/><circle cx="50" cy="50" r="15" stroke="#f7e7a1" stroke-width="1.5" fill="none"/><path d="M50 35 L50 65 M35 50 L65 50" stroke="#d4af37" stroke-width="1.5"/></svg>`,
    upright: {
      keywords: "堅定意志、克服阻礙、凱旋勝利、遠大企圖心",
      meaning: "象徵強大的掌控力與凱旋的衝勁！憑藉著堅定明確的目標，你能優雅化解眼前挑戰，勝利與榮耀近在咫尺。",
      advice: "保持專注與意志力，掌控好情緒與前進方向，屬於你的榮耀時刻即將降臨。"
    },
    reversed: {
      keywords: "調整節奏、重新定調、沉穩蓄勢、蓄勢待發",
      meaning: "提醒你在衝刺途中稍微調整呼吸與步伐。適當的休息與重新整合情緒，能讓你在下一次發力時更加猛烈精準。",
      advice: "暫緩盲目的急躁，重新梳理目標與步驟，定下心來將帶來更大的突破突破。"
    }
  },
  {
    id: 8,
    roman: "VIII",
    name_zh: "力量",
    name_en: "STRENGTH",
    image: "assets/cards/card_08_strength.jpg",
    element: "火元素 (Fire)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><path d="M30 50 C30 35 45 35 50 50 C55 35 70 35 70 50 C70 65 55 65 50 50 C45 65 30 65 30 50 Z" stroke="#f7e7a1" stroke-width="2" fill="none"/><circle cx="50" cy="50" r="28" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="4,4" fill="none"/></svg>`,
    upright: {
      keywords: "以柔克剛、內在力量、勇氣、包容、耐心優雅",
      meaning: "力量牌展現了高雅的自信與溫柔堅韌的內在力量！你能以包容與同理心優雅化解任何複雜情境，展現極具吸引力的成熟魅力。",
      advice: "運用耐心與包容溝通，相信你溫柔卻堅韌的內在底氣，能平穩戰勝任何挑戰。"
    },
    reversed: {
      keywords: "接納脆弱、溫柔堅韌、重新扎根、自我肯定",
      meaning: "提醒你接納脆弱也是成熟力量的一部分。給自己適當的肯定與多一點的溫柔，你會發現內心的定力比想像中更堅固。",
      advice: "給予自己溫柔的鼓勵，承認疲憊並好好休息，慢慢重新找回內在無堅不摧的信心。"
    }
  },
  {
    id: 9,
    roman: "IX",
    name_zh: "隱士",
    name_en: "THE HERMIT",
    image: "assets/cards/card_09_hermit.jpg",
    element: "土元素 (Earth)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><polygon points="50,20 60,40 80,40 65,55 70,75 50,62 30,75 35,55 20,40 40,40" stroke="#f7e7a1" stroke-width="1.5" fill="none"/><circle cx="50" cy="50" r="10" fill="#d4af37"/></svg>`,
    upright: {
      keywords: "沉思尋道、內省智慧、獨處覺察、明燈指引",
      meaning: "代表暫時轉向內在尋求解答的高品質時光。你正在進行一場深度的自我探索，這將帶給你極高的領悟與超凡智慧。",
      advice: "享受高品質的獨處時光，理清思緒，你內在的明燈會為你優雅照亮未來的方向。"
    },
    reversed: {
      keywords: "適度連結、分享智慧、走出溫室、擁抱溫暖",
      meaning: "宇宙鼓勵你在深思熟慮後，大方與身邊值得信任的人分享你的智慧與感受。打開心扉，外部溫暖的連結將帶給你無限靈感。",
      advice: "不要害怕與世界美好連結，適度傾訴與交流，讓陽光照亮內心每個角落。"
    }
  },
  {
    id: 10,
    roman: "X",
    name_zh: "命運之輪",
    name_en: "WHEEL OF FORTUNE",
    image: "assets/cards/card_10_wheel.jpg",
    element: "火元素 (Fire)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><circle cx="50" cy="50" r="30" stroke="#d4af37" stroke-width="2" fill="none"/><circle cx="50" cy="50" r="10" stroke="#f7e7a1" stroke-width="1.5" fill="none"/><path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" stroke="#d4af37" stroke-width="1"/></svg>`,
    upright: {
      keywords: "契機來臨、命運轉折、順應時勢、好運連連",
      meaning: "命運之輪正加速轉動！這代表著驚喜的好運與重大正面轉機即將降臨，過去深厚的累積將在關鍵時刻爆發成就。",
      advice: "敏銳捕捉身邊的新機遇，順應命運的流轉與變化，熱情擁抱新局帶來的無窮可能。"
    },
    reversed: {
      keywords: "沉澱積累、厚積薄發、順應轉機、蓄力突破",
      meaning: "提示你這是一段難得的基本功沉澱期。趁此時充實自我實力、打好根基，當下一個輪迴的轉機到來時，你將順勢扶搖直上。",
      advice: "保持平靜與彈性，利用這段沉澱期充實知識與實力，好運大門即將開放。"
    }
  },
  {
    id: 11,
    roman: "XI",
    name_zh: "正義",
    name_en: "JUSTICE",
    image: "assets/cards/card_11_justice.jpg",
    element: "風元素 (Air)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><line x1="25" y1="35" x2="75" y2="35" stroke="#d4af37" stroke-width="2"/><line x1="50" y1="20" x2="50" y2="80" stroke="#f7e7a1" stroke-width="2"/><path d="M25 35 L15 60 Q25 65 35 60 Z" stroke="#d4af37" stroke-width="1.5" fill="none"/><path d="M75 35 L65 60 Q75 65 85 60 Z" stroke="#d4af37" stroke-width="1.5" fill="none"/></svg>`,
    upright: {
      keywords: "公平公正、理性決策、豐碩回報、清晰透明",
      meaning: "正義牌代表著坦誠、明智與圓滿的裁決。你之前的付出與努力將獲得公平優渥的回報與合約肯定，成果清晰透明。",
      advice: "保持理性客觀的態度，誠實面對自己與他人，做出經得起考驗的明智抉擇。"
    },
    reversed: {
      keywords: "客觀審視、釐清真相、坦誠相待、重歸和諧",
      meaning: "這是一次重整平衡的好機會！坦誠審視局勢並調整偏差，以光明磊落的姿態回應問題，失衡的情境很快就會重歸圓滿和諧。",
      advice: "勇於面對並修正錯誤，保持光明磊落，公平與和諧的能量隨即歸位。"
    }
  },
  {
    id: 12,
    roman: "XII",
    name_zh: "倒吊人",
    name_en: "THE HANGED MAN",
    image: "assets/cards/card_12_hanged.jpg",
    element: "水元素 (Water)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><path d="M30 20 L70 20 M50 20 L50 75 M35 45 L65 45 M50 55 L70 70" stroke="#d4af37" stroke-width="2" fill="none"/><circle cx="50" cy="82" r="5" fill="#f7e7a1"/></svg>`,
    upright: {
      keywords: "換位思考、甘願奉獻、暫停沉澱、獲得新視角",
      meaning: "這是一種極具智慧的有意識暫停。換個顛倒的全新視角看世界，你會驚喜地發現過去被忽略的重大突破點與新希望。",
      advice: "放手順應當前的放空與沉澱期，換個角度思考問題，短期的沉澱將換來長遠大功。"
    },
    reversed: {
      keywords: "放下重擔、即時止損、擁抱新局、重獲自由",
      meaning: "這是一張象徵解脫與重獲自由的喜悅之牌！你決定不再做無謂的單向消耗，放下不必要的重擔，迎向專屬於你的幸福人生。",
      advice: "果斷結束無效的消耗與付出，珍視自己的能量，勇敢邁向更有價值的新局。"
    }
  },
  {
    id: 13,
    roman: "XIII",
    name_zh: "死神",
    name_en: "DEATH",
    image: "assets/cards/card_13_death.jpg",
    element: "水元素 (Water)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><path d="M50 20 L80 80 L20 80 Z" stroke="#d4af37" stroke-width="1.5" fill="none"/><circle cx="50" cy="50" r="15" fill="#09090d" stroke="#f7e7a1" stroke-width="2"/><line x1="50" y1="10" x2="50" y2="90" stroke="#d4af37" stroke-width="1"/></svg>`,
    upright: {
      keywords: "舊局結束、徹底重生、告別過去、轉型蛻變",
      meaning: "象徵著一個階段的完美圓滿與極具希望的重生！舊有不再適合你的負累徹底褪去，充滿無限可能的新優雅篇章正式萌芽。",
      advice: "勇敢揮別過去的包袱，放下執念，熱情擁抱充滿無限可能的重生嶄新大局。"
    },
    reversed: {
      keywords: "蛻變前夕、擁抱新生、破繭成蝶、迎向光明",
      meaning: "代表你正站在破繭成蝶的輝煌時刻！只要你願意伸開雙手允許改變發生，嶄新的機會與幸福將力刻順暢流入你的生活。",
      advice: "放手是擁抱幸福的第一步，允許新舊交替，清空空間容納未來的無盡美好的喜悅。"
    }
  },
  {
    id: 14,
    roman: "XIV",
    name_zh: "節制",
    name_en: "TEMPERANCE",
    image: "assets/cards/card_14_temperance.jpg",
    element: "火元素 (Fire)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><path d="M35 30 Q50 45 65 30 M35 70 Q50 55 65 70" stroke="#d4af37" stroke-width="2" fill="none"/><circle cx="50" cy="50" r="8" fill="#f7e7a1"/><line x1="50" y1="20" x2="50" y2="80" stroke="#f7e7a1" stroke-width="1.5"/></svg>`,
    upright: {
      keywords: "身心平衡、極致協調、藝術調和、靈性昇華",
      meaning: "節制象徵著不同元素的完美融合與優雅和諧！你在極端之間找到了最優雅的平衡點，事業與私生活融洽協調發展。",
      advice: "保持平靜與中庸之道，以圓融溝通促進團隊或情感的和諧，達成靈魂深處的滿足。"
    },
    reversed: {
      keywords: "調慢步調、平衡身心、溫柔協調、重尋和諧",
      meaning: "溫馨提醒你適當調慢生活的步調，檢視精力分配。給予身心靈全面的放鬆與協調，極致的和諧秩序很快就會重現。",
      advice: "重新調整作息與心態，給自己溫柔修復的時間，身心靈的平衡將為你帶來滿滿能量。"
    }
  },
  {
    id: 15,
    roman: "XV",
    name_zh: "惡魔",
    name_en: "THE DEVIL",
    image: "assets/cards/card_15_devil.jpg",
    element: "土元素 (Earth)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><polygon points="50,15 62,35 85,35 67,50 73,72 50,58 27,72 33,50 15,35 38,35" stroke="#d4af37" stroke-width="1.5" fill="none"/><circle cx="50" cy="45" r="25" stroke="#f7e7a1" stroke-width="1.5" stroke-dasharray="2,4" fill="none"/></svg>`,
    upright: {
      keywords: "強烈吸引、物質豐盛、感官魅力、意志清醒",
      meaning: "代表著強烈美好的吸引力與物質感官享受。只要你保持清醒的自主意志，這份強大的熱情與吸引力將成為你事業或情感的催化劑。",
      advice: "清醒掌控自己的意志與心智，享受物質與情感帶來的喜悅，同時保持健康的獨立自主。"
    },
    reversed: {
      keywords: "掙脫枷鎖、覺醒看清、重獲自由、獨立自主",
      meaning: "這是一張象徵完全覺醒與清醒自立的喜悅之牌！你終於看清了過度執著的盲點，決定打破不健康的束縛，重獲海闊天空的自由。",
      advice: "為你的覺醒與勇氣喝采，堅定地邁向獨立自主的新生活，主導屬於你的幸福。"
    }
  },
  {
    id: 16,
    roman: "XVI",
    name_zh: "高塔",
    name_en: "THE TOWER",
    image: "assets/cards/card_16_tower.jpg",
    element: "火元素 (Fire)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><path d="M40 90 L40 30 L50 15 L60 30 L60 90 Z" stroke="#d4af37" stroke-width="2" fill="none"/><path d="M25 35 L40 45 L35 55 L55 65 L45 75 L65 85" stroke="#f7e7a1" stroke-width="2" fill="none"/></svg>`,
    upright: {
      keywords: "打破虛假、震撼覺醒、真相大白、重新奠基",
      meaning: "象徵著瞬間爆發的覺醒與真相大白！雖然突如其來的改變令人驚訝，但它會無情地摧毀建立在虛假上的幻象，為你讓位給真正穩固的大局。",
      advice: "接受真實情況的揭露，舊虛假的倒塌是為了讓位給真正堅固的成功基石。"
    },
    reversed: {
      keywords: "微小警訊、提早防範、清理舊局、重建堅固",
      meaning: "這是一張貼心的避險提醒！提示你提早注意到潛在的微小警訊並主動處理風險，防患於未然，從而建立起更加堅固安穩的新基石。",
      advice: "主動面對並處理潛在風險，徹底清理根基，你將打造出堅不可摧的長遠成功。"
    }
  },
  {
    id: 17,
    roman: "XVII",
    name_zh: "星星",
    name_en: "THE STAR",
    image: "assets/cards/card_17_star.jpg",
    element: "風元素 (Air)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><polygon points="50,10 61,35 88,35 66,50 74,75 50,60 26,75 34,50 12,35 39,35" stroke="#f7e7a1" stroke-width="2" fill="none"/><circle cx="50" cy="45" r="10" fill="#d4af37"/></svg>`,
    upright: {
      keywords: "希望指引、心靈療癒、靈感湧現、美好願景",
      meaning: "璀璨無比的希望之星在夜空中高升！這代表著深度的身心靈療癒、源源不絕的靈感與對未來的十足信心，耀星正為你引路。",
      advice: "保持純真與希望，將你的美好願景化為創作與行動，宇宙正無條件祝福著你。"
    },
    reversed: {
      keywords: "重燃希望、重新點燈、發現微光、相信美好",
      meaning: "提醒你不要忽略身邊其實依然存在著無數微光與機會。重整心情，重新點燃內心深處對美好的堅定信念，奇蹟就在身邊。",
      advice: "重新拾起對未來的熱情與信心，小小的微光很快就會匯聚成耀眼星河。"
    }
  },
  {
    id: 18,
    roman: "XVIII",
    name_zh: "月亮",
    name_en: "THE MOON",
    image: "assets/cards/card_18_moon.jpg",
    element: "水元素 (Water)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><path d="M40 20 A30 30 0 1 0 70 80 A35 35 0 1 1 40 20 Z" fill="#d4af37"/><circle cx="65" cy="35" r="3" fill="#f7e7a1"/><circle cx="75" cy="50" r="2" fill="#f7e7a1"/></svg>`,
    upright: {
      keywords: "直覺覺察、潛意識探索、敏感細緻、靈魂成長",
      meaning: "月亮代表著潛意識深處的強大直覺與靈性敏感度。保持定心沉思，這段時期將激發你豐富的創造力與深層的心靈覺察。",
      advice: "不必被暫時的迷霧困擾，靜心等待曙光重現，信任你靈魂深處的微光直覺。"
    },
    reversed: {
      keywords: "迷霧散去、真相大白、理清思緒、迎向陽光",
      meaning: "好消息！籠罩在心頭的迷霧與疑雲正迅速消散，真相與答案即將完全浮出水面，你終於能理清思路、大步邁向有光的地方。",
      advice: "擁抱清析的理智與自信，告別杞人憂天，踏實燦爛地邁向光明的未來。"
    }
  },
  {
    id: 19,
    roman: "XIX",
    name_zh: "太陽",
    name_en: "THE SUN",
    image: "assets/cards/card_19_sun.jpg",
    element: "火元素 (Fire)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><circle cx="50" cy="50" r="20" fill="#d4af37"/><path d="M50 15 L50 5 M50 85 L50 95 M15 50 L5 50 M85 50 L95 50 M25 25 L18 18 M75 75 L82 82 M25 75 L18 82 M75 25 L82 18" stroke="#f7e7a1" stroke-width="3.5"/></svg>`,
    upright: {
      keywords: "極致成功、光明喜悅、生命力、真誠與榮耀",
      meaning: "塔羅牌中最具陽光與正面能量的王者牌！太陽帶來無與倫比的溫暖、大成功與極致喜悅。你的熱情將照亮所有人，事業與生活皆耀眼綻放。",
      advice: "大方分享你的喜悅與能量，自信展示你的成就，享受生命賦予你的輝煌光芒。"
    },
    reversed: {
      keywords: "烏雲漸散、樂觀期待、維持謙遜、喜悅在即",
      meaning: "太陽的光芒永遠不會熄滅！烏雲只是短暫拂過，成功與喜悅很快就會光臨。維持你的謙遜與熱情，美好的大成果即將揭曉。",
      advice: "保持樂觀的心情，烏雲很快就會散去。繼續維持謙遜與熱情即可。"
    }
  },
  {
    id: 20,
    roman: "XX",
    name_zh: "審判",
    name_en: "JUDGEMENT",
    image: "assets/cards/card_20_judgement.jpg",
    element: "火元素 (Fire)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><polygon points="50,15 35,40 65,40" fill="#d4af37"/><line x1="50" y1="40" x2="50" y2="85" stroke="#f7e7a1" stroke-width="2.5"/><path d="M30 60 Q50 75 70 60" stroke="#d4af37" stroke-width="2" fill="none"/></svg>`,
    upright: {
      keywords: "靈魂召喚、重大覺醒、洗盡鉛華、邁向新高度",
      meaning: "審判號角已經吹響！代表著靈魂層面的重大覺醒與榮耀呼喚。你將從過去的寶貴經驗中總結智慧，洗盡鉛華，迎來完美的升級！",
      advice: "聆聽你內心深處最真實的召喚，勇敢做出影響人生的重大優雅決定，邁向更高次元。"
    },
    reversed: {
      keywords: "原諒自我、告別過去、勇敢覺醒、邁向新局",
      meaning: "宇宙鼓勵你原諒過去的自己，歷史已成過去，未來的選擇權永遠掌握在你的手上！原諒過去，嶄新的高能盛局正等著你。",
      advice: "溫柔原諒過去的自己，勇敢做出有利於未來的明智選擇，幸福就在前方。"
    }
  },
  {
    id: 21,
    roman: "XXI",
    name_zh: "世界",
    name_en: "THE WORLD",
    image: "assets/cards/card_21_world.jpg",
    element: "土元素 (Earth)",
    symbol_svg: `<svg viewBox="0 0 100 100" class="gold-svg"><ellipse cx="50" cy="50" rx="30" ry="40" stroke="#d4af37" stroke-width="2" fill="none"/><polygon points="50,25 60,45 40,45" fill="#f7e7a1"/><circle cx="50" cy="65" r="8" fill="#d4af37"/></svg>`,
    upright: {
      keywords: "圓滿達成、旅程終點、完美融合、自由與榮耀",
      meaning: "大阿爾克那的最終輝煌章節！代表著一個重大階段的圓滿成功與大獲全勝。你達成了身心靈的高度和諧，站在榮耀巔峰！",
      advice: "歡慶你的圓滿與大成功！享受這份榮耀，同時以寬廣胸懷迎向下一輪美妙的生命循環。"
    },
    reversed: {
      keywords: "臨門一腳、完善細節、圓滿在即、邁向顛峰",
      meaning: "目標已經極度接近完美成功！只需耐心補齊最後一份拼圖或細節，你將徹底迎來大圓滿的榮耀時刻。",
      advice: "耐心補齊最後的拼圖細節，不要在最後關頭放棄，完美的終點就在眼前。"
    }
  }
];

// --- 四大正向熱門命運主題與範例靈感問題庫 ---
const QUESTION_CATEGORIES = {
  love: {
    id: "love",
    name: "情感與關係",
    icon: "💖",
    defaultQuestion: "我們這段感情未來的和諧發展與幸福指引？",
    hints: [
      "他/她現在對我是什麼感覺？我們該如何拉近距離？",
      "我們還有哪些美好的復合契機與和諧發展空間？",
      "我們未來會如何順利發展成美好戀人或走到幸福結婚？",
      "我什麼時候能遇見理想對象？我的正緣桃花有什麼迷人特徵？"
    ],
    spread: {
      count: 3,
      containerClass: "triangle-spread",
      slots: [
        { title: "I. 情感羈絆與根基", sub: "Emotional Foundation" },
        { title: "II. 當前真實心意與和諧契機", sub: "Partner's Heart & Bond" },
        { title: "III. 未來美好走向與靈魂指引", sub: "Future Destiny & Blessing" }
      ]
    }
  },
  career: {
    id: "career",
    name: "工作與事業",
    icon: "💼",
    defaultQuestion: "我目前的職涯發展與升遷轉職最佳決策？",
    hints: [
      "我該如何順利迎向更好的轉職跳槽新契機？",
      "我在目前公司的未來發展如何？會順利升職加薪嗎？",
      "職場貴人與主管對我的期待看法是什麼？我該如何發揮優勢？"
    ],
    spread: {
      count: 3,
      containerClass: "triangle-spread",
      slots: [
        { title: "I. 目前事業現狀與優勢基石", sub: "Career Foundation" },
        { title: "II. 前景契機與發揮空間", sub: "Opportunities & Growth" },
        { title: "III. 突破職涯瓶頸的最佳指引", sub: "Career Advancement Guidance" }
      ]
    }
  },
  wealth: {
    id: "wealth",
    name: "金錢與財運",
    icon: "💰",
    defaultQuestion: "我最近的財運趨勢與財富累積建議？",
    hints: [
      "我最近的偏財運如何？投資這個項目會如何獲得良好回報？",
      "財運是否會改善：我的財運近期會有怎樣顯著的提升與改善？"
    ],
    spread: {
      count: 3,
      containerClass: "triangle-spread",
      slots: [
        { title: "I. 當前財庫與現金流能量", sub: "Current Wealth Energy" },
        { title: "II. 偏財與投資發展趨勢", sub: "Investment & Wealth Outcome" },
        { title: "III. 豐盛引流與財運提升的靈魂指引", sub: "Attracting Abundance Guidance" }
      ]
    }
  },
  other: {
    id: "other",
    name: "其他問題",
    icon: "✨",
    defaultQuestion: "我心中的疑問與未來人生靈魂指引？",
    hints: [
      "我近期的身心靈能量狀態與整體運勢發展？",
      "面對當前的人生抉擇，宇宙給我什麼最佳靈魂指引？",
      "我該如何提升自己的幸運能量與優雅生活品質？"
    ],
    spread: {
      count: 3,
      containerClass: "triangle-spread",
      slots: [
        { title: "I. 當前身心靈能量基石", sub: "Current Life Energy" },
        { title: "II. 前景機遇與潛在顯化空間", sub: "Potential & Manifestation" },
        { title: "III. 耀星祝福與智慧指引", sub: "Cosmic Blessing Guidance" }
      ]
    }
  }
};

// --- 全域狀態變數 ---
let currentCategory = 'love';
let currentDrawMode = 'interactive'; // 'interactive' | 'auto'
let shuffledDeck = [];
let drawnCards = [];
let isShuffled = false;
let isRevealed = [];

// --- Web Audio 狀態與節點管理 ---
let soundEnabled = true;
let bgmEnabled = true;
let audioCtx = null;
let masterGainNode = null;
let masterCompressor = null;
let bgmGainNode = null;
let sfxGainNode = null;
let bgmSourceNode = null;
let celestialAudioBuffer = null;
let isBgmPlaying = false;
let isUserInteracted = false;
let isPageHidden = false;

// --- DOM 元素引用 ---
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

const categoryTabs = document.querySelectorAll('.category-tab');
const userCustomQuestionInput = document.getElementById('user-custom-question');
const questionHints = document.getElementById('question-hints');

const deckStack = document.getElementById('deck-stack');
const deckFanStage = document.getElementById('deck-fan-stage');
const deckFanContainer = document.getElementById('deck-fan-container');
const fanInstructions = document.getElementById('fan-instructions');
const fanRemainingCount = document.getElementById('fan-remaining-count');
const deckStatus = document.getElementById('deck-status');

const btnShuffle = document.getElementById('btn-shuffle');
const btnDraw = document.getElementById('btn-draw');
const btnRevealAll = document.getElementById('btn-reveal-all');
const btnReset = document.getElementById('btn-reset');

const spreadContainer = document.getElementById('spread-container');
const modeTabs = document.querySelectorAll('.mode-tab');

const synthesisSection = document.getElementById('synthesis-section');
const synthesisTitle = document.getElementById('synthesis-title');
const synthesisContent = document.getElementById('synthesis-content');
const btnCopySynthesis = document.getElementById('btn-copy-synthesis');
const btnSaveSynthesis = document.getElementById('btn-save-synthesis');

// Top Nav Buttons
const btnSoundToggle = document.getElementById('btn-sound-toggle');
const soundIcon = document.getElementById('sound-icon');
const soundLabel = document.getElementById('sound-label');

const btnBgmToggle = document.getElementById('btn-bgm-toggle');
const bgmIcon = document.getElementById('bgm-icon');
const bgmLabel = document.getElementById('bgm-label');

const btnOpenCodex = document.getElementById('btn-open-codex');
const btnOpenHistory = document.getElementById('btn-open-history');

// Modals
const cardModal = document.getElementById('card-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalPosTag = document.getElementById('modal-position-tag');
const modalCardName = document.getElementById('modal-card-name');
const modalOrientTag = document.getElementById('modal-orient-tag');
const modalVisual = document.getElementById('modal-card-visual');
const modalKeywords = document.getElementById('modal-keywords');
const modalElement = document.getElementById('modal-element');
const modalMeaning = document.getElementById('modal-meaning');
const modalAdvice = document.getElementById('modal-advice');

const codexModal = document.getElementById('codex-modal');
const codexCloseBtn = document.getElementById('codex-close-btn');
const codexGrid = document.getElementById('codex-grid');

const historyModal = document.getElementById('history-modal');
const historyCloseBtn = document.getElementById('history-close-btn');
const historyList = document.getElementById('history-list');
const btnClearHistory = document.getElementById('btn-clear-history');

// --- 初始化執行 ---
document.addEventListener('DOMContentLoaded', () => {
  initStarCanvas();
  bindEvents();
  renderQuestionHints('love');
  renderSpreadLayout();
  initCodexGrid();
  setupAudioLifecycle();
  setupUserInteractionUnlock();

  // 嘗試在載入時啟動背景音樂（若瀏覽器策略允許）
  try {
    startMysteriousBGM();
  } catch(e) {}
});

// --- Web Audio API 聲音核心引擎 ---
function initAudioEngine() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioCtx = new AudioContextClass();

    // 建立專業級防爆音/防破音 Limiter (Soft Knee & Conservative Ratio)
    masterCompressor = audioCtx.createDynamicsCompressor();
    masterCompressor.threshold.setValueAtTime(-18, audioCtx.currentTime);
    masterCompressor.knee.setValueAtTime(15, audioCtx.currentTime);
    masterCompressor.ratio.setValueAtTime(6, audioCtx.currentTime);
    masterCompressor.attack.setValueAtTime(0.005, audioCtx.currentTime);
    masterCompressor.release.setValueAtTime(0.15, audioCtx.currentTime);

    // 主音量 (Master Gain: 0.7 避免手機 DAC 數位削波破音)
    masterGainNode = audioCtx.createGain();
    masterGainNode.gain.setValueAtTime(0.7, audioCtx.currentTime);

    // 背景音樂專用音量 (BGM Gain: 0.035 柔和優雅)
    bgmGainNode = audioCtx.createGain();
    bgmGainNode.gain.setValueAtTime(0.035, audioCtx.currentTime);

    // 音效專用音量 (SFX Gain: 0.25 清晰無破音)
    sfxGainNode = audioCtx.createGain();
    sfxGainNode.gain.setValueAtTime(0.25, audioCtx.currentTime);

    // 路由連接：BGM/SFX -> MasterCompressor -> MasterGain -> Destination
    bgmGainNode.connect(masterCompressor);
    sfxGainNode.connect(masterCompressor);
    masterCompressor.connect(masterGainNode);
    masterGainNode.connect(audioCtx.destination);
  }
  return audioCtx;
}

function getAudioContext() {
  const ac = initAudioEngine();
  if (ac && ac.state === 'suspended' && !isPageHidden && isUserInteracted) {
    ac.resume().catch(() => {});
  }
  return ac;
}

// 產生 100% 數學連續、零爆音、零接縫的 16 秒空靈神祕旋律 AudioBuffer
function generateCelestialAudioBuffer(ac) {
  if (celestialAudioBuffer) return celestialAudioBuffer;

  const sampleRate = ac.sampleRate || 44100;
  const loopDuration = 16.0;
  const numSamples = Math.floor(sampleRate * loopDuration);
  const buffer = ac.createBuffer(2, numSamples, sampleRate);
  const left = buffer.getChannelData(0);
  const right = buffer.getChannelData(1);

  // 1. 底層溫暖和弦 (溫和正弦波，嚴格頻率整週期相位對齊，防止斷點)
  const padHarmonics = [
    { f: 220.0, vol: 0.018, pan: 0.0 },   // A3
    { f: 261.63, vol: 0.015, pan: -0.25 },// C4
    { f: 329.63, vol: 0.014, pan: 0.25 }, // E4
    { f: 392.0, vol: 0.012, pan: -0.15 }, // G4
    { f: 440.0, vol: 0.010, pan: 0.15 }   // A4
  ];

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sampleL = 0;
    let sampleR = 0;

    // 呼吸波動感 (8秒一週期，16秒剛好兩個完整週期，無縫接軌)
    const lfo = 0.8 + 0.2 * Math.cos((2 * Math.PI * t) / 8.0);

    for (let h = 0; h < padHarmonics.length; h++) {
      const harm = padHarmonics[h];
      const phase = 2 * Math.PI * harm.f * t;
      const s = Math.sin(phase) * harm.vol * lfo;
      sampleL += s * (1 - harm.pan);
      sampleR += s * (1 + harm.pan);
    }

    left[i] = sampleL;
    right[i] = sampleR;
  }

  // 2. 空靈星光水晶音缽 (使用平滑 Hann 升餘弦窗包絡，絕無起振/截止突變爆音)
  const melodyEvents = [
    { time: 0.8, freq: 523.25, pan: -0.3, amp: 0.025, len: 3.0 }, // C5
    { time: 3.2, freq: 659.25, pan: 0.3, amp: 0.022, len: 3.0 },  // E5
    { time: 5.8, freq: 783.99, pan: -0.2, amp: 0.025, len: 3.2 }, // G5
    { time: 8.5, freq: 880.0, pan: 0.2, amp: 0.028, len: 3.5 },   // A5
    { time: 11.2, freq: 659.25, pan: -0.25, amp: 0.022, len: 3.0 } // E5
  ];

  melodyEvents.forEach(evt => {
    const startIdx = Math.floor(evt.time * sampleRate);
    const noteSamples = Math.floor(evt.len * sampleRate);

    for (let n = 0; n < noteSamples; n++) {
      const targetIdx = (startIdx + n) % numSamples;
      const noteT = n / sampleRate;
      
      // 升餘弦軟起振 (Attack: 0.08s) 與指數衰減 (Decay)
      let env = 0;
      if (noteT < 0.08) {
        env = 0.5 * (1 - Math.cos((Math.PI * noteT) / 0.08));
      } else {
        env = Math.exp(-(noteT - 0.08) * 1.3);
      }
      
      // 純淨正弦泛音
      const val = (Math.sin(2 * Math.PI * evt.freq * noteT) + 
                   0.2 * Math.sin(2 * Math.PI * evt.freq * 2 * noteT)) * evt.amp * env;

      left[targetIdx] += val * (1 - evt.pan);
      right[targetIdx] += val * (1 + evt.pan);
    }
  });

  // 3. 完美頭尾平滑無縫融合 (0.8s Smooth Equal-Power Windowing)
  const blendLen = Math.floor(sampleRate * 0.8);
  for (let i = 0; i < blendLen; i++) {
    const p = i / blendLen;
    // 升餘弦權重曲線 (保證頭尾接縫導數連續，完全消除咔嗒爆音)
    const wStart = 0.5 * (1 - Math.cos(Math.PI * p));
    const wEnd = 1 - wStart;
    
    const tailIdx = numSamples - blendLen + i;
    const blendedL = left[tailIdx] * wEnd + left[i] * wStart;
    const blendedR = right[tailIdx] * wEnd + right[i] * wStart;

    left[i] = blendedL;
    right[i] = blendedR;
  }
  // 同步尾部 sample 與頭部完全閉合
  for (let i = 0; i < blendLen; i++) {
    const tailIdx = numSamples - blendLen + i;
    left[tailIdx] = left[i];
    right[tailIdx] = right[i];
  }

  celestialAudioBuffer = buffer;
  return buffer;
}

// 監聽手勢解鎖手機端音訊播放限制
function setupUserInteractionUnlock() {
  const events = ['touchstart', 'touchend', 'pointerdown', 'mousedown', 'click'];
  
  function handleFirstUserGesture() {
    isUserInteracted = true;
    const ac = initAudioEngine();
    if (ac) {
      if (ac.state === 'suspended') {
        ac.resume().then(() => {
          if (bgmEnabled && !isPageHidden && !isBgmPlaying && !document.hidden) {
            startMysteriousBGM();
          }
        }).catch(() => {});
      } else {
        if (bgmEnabled && !isPageHidden && !isBgmPlaying && !document.hidden) {
          startMysteriousBGM();
        }
      }
    }

    // 解鎖後立即移除手勢監聽
    events.forEach(evt => {
      window.removeEventListener(evt, handleFirstUserGesture, { capture: true, passive: true });
      document.removeEventListener(evt, handleFirstUserGesture, { capture: true, passive: true });
    });
  }

  events.forEach(evt => {
    window.addEventListener(evt, handleFirstUserGesture, { capture: true, passive: true });
    document.addEventListener(evt, handleFirstUserGesture, { capture: true, passive: true });
  });
}

// --- 完整頁面生命週期管理（徹底解決跳出/鎖屏/關閉軟體時音樂繼續播放與爆音問題） ---
function setupAudioLifecycle() {
  function handleAppBackground() {
    isPageHidden = true;
    stopMysteriousBGM(true); // 立即徹底停止背景音樂節點
    
    if (audioCtx) {
      try {
        if (masterGainNode) {
          masterGainNode.gain.cancelScheduledValues(0);
          masterGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        }
        if (audioCtx.state === 'running') {
          audioCtx.suspend().catch(() => {});
        }
      } catch(e) {}
    }
  }

  function handleAppForeground() {
    // 嚴格確認頁面是真的在可見前景
    if (document.hidden || document.visibilityState === 'hidden') {
      return;
    }
    
    isPageHidden = false;
    
    if (audioCtx && masterGainNode) {
      try {
        const now = audioCtx.currentTime;
        masterGainNode.gain.cancelScheduledValues(0);
        masterGainNode.gain.setValueAtTime(0, now);
        masterGainNode.gain.linearRampToValueAtTime(0.7, now + 0.3); // 0.3s 溫和淡入，防爆音
      } catch(e) {}
    }
    
    if (bgmEnabled && isUserInteracted) {
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().then(() => {
          if (!isPageHidden && bgmEnabled && !isBgmPlaying && !document.hidden) {
            startMysteriousBGM();
          }
        }).catch(() => {});
      } else if (!isBgmPlaying) {
        startMysteriousBGM();
      }
    }
  }

  // 1. 標準 visibilitychange (切換分頁、最小化、按 Home 鍵、鎖屏)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden || document.visibilityState === 'hidden') {
      handleAppBackground();
    } else {
      handleAppForeground();
    }
  }, { passive: true });

  // 支援 WebKit 前綴
  document.addEventListener('webkitvisibilitychange', () => {
    if (document.hidden || document.webkitHidden) {
      handleAppBackground();
    } else {
      handleAppForeground();
    }
  }, { passive: true });

  // 2. LINE、FB、IG 內嵌 WebView 關閉或返回聊天室時關鍵事件
  window.addEventListener('pagehide', handleAppBackground, { passive: true });
  window.addEventListener('beforeunload', handleAppBackground, { passive: true });
  window.addEventListener('unload', handleAppBackground, { passive: true });
  document.addEventListener('freeze', handleAppBackground, { passive: true });
}

// --- 🎶 晶瑩仙境靈性神祕旋律 (Melodious Celestial BGM) ---
function startMysteriousBGM() {
  if (!bgmEnabled || isPageHidden || document.hidden) return;
  if (isBgmPlaying) return;

  const ac = initAudioEngine();
  if (!ac) return;

  if (ac.state === 'suspended') {
    ac.resume().then(() => {
      if (bgmEnabled && !isPageHidden && !isBgmPlaying && !document.hidden) {
        startMysteriousBGM();
      }
    }).catch(() => {});
    return;
  }

  try {
    stopMysteriousBGM(true);
    const buffer = generateCelestialAudioBuffer(ac);
    bgmSourceNode = ac.createBufferSource();
    bgmSourceNode.buffer = buffer;
    bgmSourceNode.loop = true;
    bgmSourceNode.connect(bgmGainNode);
    
    // 淡入 BGM 音量，杜絕任何瞬間起振爆音
    const now = ac.currentTime;
    bgmGainNode.gain.cancelScheduledValues(0);
    bgmGainNode.gain.setValueAtTime(0.0001, now);
    bgmGainNode.gain.linearRampToValueAtTime(0.035, now + 0.4);

    bgmSourceNode.start(0);
    isBgmPlaying = true;
  } catch (e) {
    console.warn("BGM start error:", e);
    isBgmPlaying = false;
  }
}

function stopMysteriousBGM(immediate = false) {
  isBgmPlaying = false;
  if (bgmSourceNode) {
    try {
      if (audioCtx && bgmGainNode && !immediate) {
        const now = audioCtx.currentTime;
        bgmGainNode.gain.cancelScheduledValues(0);
        bgmGainNode.gain.setValueAtTime(bgmGainNode.gain.value, now);
        bgmGainNode.gain.linearRampToValueAtTime(0.0001, now + 0.15);
      }
      bgmSourceNode.stop(0);
      bgmSourceNode.disconnect();
    } catch(e) {}
    bgmSourceNode = null;
  }
}

function toggleBGM() {
  bgmEnabled = !bgmEnabled;
  if (bgmEnabled) {
    bgmIcon.innerText = "🎶";
    bgmLabel.innerText = "神祕旋律: 開";
    btnBgmToggle.classList.add('active');
    isUserInteracted = true;
    startMysteriousBGM();
    showToast("🎶 已開啟悠揚優雅的神祕星空旋律");
  } else {
    bgmIcon.innerText = "🔇";
    bgmLabel.innerText = "神祕旋律: 關";
    btnBgmToggle.classList.remove('active');
    stopMysteriousBGM(true);
    showToast("🔇 背景音樂已關閉");
  }
}

// --- 洗牌與翻牌音效 (經過平滑 Envelope 優化，絕無爆音) ---
function playShuffleSound() {
  if (!soundEnabled || isPageHidden || document.hidden) return;
  try {
    const ac = getAudioContext();
    if (!ac || ac.state !== 'running' || !sfxGainNode) return;

    const sampleRate = ac.sampleRate || 44100;
    const duration = 0.2;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = ac.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    
    // 產生柔和粉紅噪聲 (Soft Pink Noise)
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2) * 0.15;
    }

    const noise = ac.createBufferSource();
    noise.buffer = buffer;

    const filter = ac.createBiquadFilter();
    filter.type = 'bandpass';
    const now = ac.currentTime;
    filter.frequency.setValueAtTime(500, now);
    filter.frequency.exponentialRampToValueAtTime(1600, now + 0.18);
    filter.Q.setValueAtTime(1.0, now);

    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.19);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(sfxGainNode);

    noise.start(now);
    noise.stop(now + duration);
    setTimeout(() => {
      try {
        noise.disconnect();
        filter.disconnect();
        gain.disconnect();
      } catch(e) {}
    }, 250);
  } catch (e) {}
}

function playFlipSound() {
  if (!soundEnabled || isPageHidden || document.hidden) return;
  try {
    const ac = getAudioContext();
    if (!ac || ac.state !== 'running' || !sfxGainNode) return;

    const osc = ac.createOscillator();
    const gain = ac.createGain();
    const now = ac.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880.0, now); // A5
    osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.16); // C5

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    osc.connect(gain);
    gain.connect(sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.2);
    setTimeout(() => {
      try {
        osc.disconnect();
        gain.disconnect();
      } catch(e) {}
    }, 250);
  } catch (e) {}
}

function playSuccessChime() {
  if (!soundEnabled || isPageHidden || document.hidden) return;
  try {
    const ac = getAudioContext();
    if (!ac || ac.state !== 'running' || !sfxGainNode) return;

    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    freqs.forEach((freq, idx) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      const startTime = ac.currentTime + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.06, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.6);

      osc.connect(gain);
      gain.connect(sfxGainNode);

      osc.start(startTime);
      osc.stop(startTime + 0.65);
      setTimeout(() => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch(e) {}
      }, 800);
    });
  } catch (e) {}
}

// --- Toast 訊息提示 ---
function showToast(msg) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<span>✨</span> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => toast.remove(), 500);
  }, 2500);
}

// --- 動態背景星空畫布 ---
function initStarCanvas() {
  let stars = [];
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 8000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005
      });
    }
  }

  window.addEventListener('resize', resize);
  resize();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f7e7a1';
    stars.forEach(star => {
      star.alpha += star.speed;
      if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;
      ctx.globalAlpha = Math.abs(star.alpha) * 0.7;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// --- 事件綁定 ---
function bindEvents() {
  btnShuffle.addEventListener('click', handleShuffle);
  btnDraw.addEventListener('click', handleDrawAuto);
  btnRevealAll.addEventListener('click', handleRevealAll);
  btnReset.addEventListener('click', handleReset);
  deckStack.addEventListener('click', handleShuffle);

  btnCopySynthesis.addEventListener('click', copySynthesisReport);
  btnSaveSynthesis.addEventListener('click', saveSynthesisToHistory);

  // Top Nav Buttons
  btnSoundToggle.addEventListener('click', toggleSound);
  btnBgmToggle.addEventListener('click', toggleBGM);
  btnOpenCodex.addEventListener('click', openCodexModal);
  btnOpenHistory.addEventListener('click', openHistoryModal);

  // Modals close
  modalCloseBtn.addEventListener('click', () => cardModal.style.display = 'none');
  codexCloseBtn.addEventListener('click', () => codexModal.style.display = 'none');
  historyCloseBtn.addEventListener('click', () => historyModal.style.display = 'none');
  btnClearHistory.addEventListener('click', clearHistoryLogs);

  [cardModal, codexModal, historyModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });

  // 四大分類切換
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const cat = e.currentTarget.dataset.category;
      if (cat === currentCategory) return;
      categoryTabs.forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentCategory = cat;
      userCustomQuestionInput.value = '';
      renderQuestionHints(cat);
      renderSpreadLayout();
      handleReset();
    });
  });

  // 抽牌儀式模式切換
  modeTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const mode = e.currentTarget.dataset.mode;
      if (mode === currentDrawMode) return;
      modeTabs.forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentDrawMode = mode;
      handleReset();
    });
  });

  // 圖鑑篩選按鈕
  document.querySelectorAll('.codex-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.codex-filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const filter = e.currentTarget.dataset.filter;
      filterCodexGrid(filter);
    });
  });
}

// --- 音效開關切換 ---
function toggleSound() {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    soundIcon.innerText = "🔊";
    soundLabel.innerText = "音效: 開";
    showToast("洗牌/翻牌音效已開啟");
    playFlipSound();
  } else {
    soundIcon.innerText = "🔇";
    soundLabel.innerText = "音效: 靜音";
    showToast("洗牌/翻牌音效已靜音");
  }
}

// --- 動態渲染參考題目標籤 (Hint Tags) ---
function renderQuestionHints(catKey) {
  const catObj = QUESTION_CATEGORIES[catKey];
  let html = '';

  catObj.hints.forEach((hintText) => {
    html += `
      <button class="hint-tag" data-hint="${hintText}">
        ✦ ${hintText}
      </button>
    `;
  });

  questionHints.innerHTML = html;

  questionHints.querySelectorAll('.hint-tag').forEach(tagBtn => {
    tagBtn.addEventListener('click', (e) => {
      const hintText = e.currentTarget.dataset.hint;
      userCustomQuestionInput.value = hintText;
      questionHints.querySelectorAll('.hint-tag').forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      showToast("已自動填入問題題目");
    });
  });
}

// --- 取得當前使用者諮詢的問題文字 ---
function getUserQuestionText() {
  const customText = userCustomQuestionInput.value.trim();
  if (customText.length > 0) {
    return customText;
  }
  const catObj = QUESTION_CATEGORIES[currentCategory];
  return catObj.defaultQuestion;
}

// --- 牌陣版面動態渲染 ---
function renderSpreadLayout() {
  const catObj = QUESTION_CATEGORIES[currentCategory];
  const config = catObj.spread;

  spreadContainer.className = `spread-container ${config.containerClass}`;
  
  let slotsHTML = '';
  config.slots.forEach((slot, idx) => {
    slotsHTML += `
      <div class="spread-slot" data-slot="${idx}">
        <div class="slot-badge">${slot.title}</div>
        <div class="slot-subtitle">${slot.sub}</div>
        <div class="card-placeholder" id="slot-${idx}">
          <div class="empty-glow">✦</div>
          <span class="empty-text">等待抽取</span>
        </div>
      </div>
    `;
  });

  spreadContainer.innerHTML = slotsHTML;
}

// --- 費雪-耶茲洗牌演算法 ---
function fisherYatesShuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// --- 處理洗牌邏輯 ---
function handleShuffle() {
  if (deckStack.classList.contains('shuffling')) return;

  playShuffleSound();
  deckStack.classList.add('shuffling');
  deckStatus.innerText = "✨ 正在洗牌匯聚靈性能量...";
  btnShuffle.disabled = true;

  setTimeout(() => {
    shuffledDeck = fisherYatesShuffle(TAROT_DECK);
    isShuffled = true;
    deckStack.classList.remove('shuffling');
    btnShuffle.disabled = false;

    if (currentDrawMode === 'interactive') {
      deckStack.style.display = 'none';
      deckFanStage.style.display = 'flex';
      renderInteractiveFan();
      btnShuffle.style.display = 'none';
      btnDraw.style.display = 'none';
      btnReset.style.display = 'inline-flex';
    } else {
      deckStatus.innerText = "✦ 洗牌完畢！點擊下方按鈕自動發牌";
      btnShuffle.style.display = 'none';
      btnDraw.style.display = 'inline-flex';
      btnReset.style.display = 'inline-flex';
    }
  }, 600);
}

// --- 親自直覺擇牌扇形 layout 渲染 (電腦與手機雙端完美弧形、絕不出格不裁切) ---
function renderInteractiveFan() {
  const catObj = QUESTION_CATEGORIES[currentCategory];
  const config = catObj.spread;

  drawnCards = [];
  isRevealed = new Array(config.count).fill(false);
  
  fanRemainingCount.innerText = config.count;
  deckStatus.style.display = 'none'; // 隱藏下方重複文字，保持介面乾淨

  deckFanContainer.innerHTML = '';
  const totalCards = 22;
  const screenW = Math.min(window.innerWidth, document.documentElement.clientWidth || window.innerWidth);
  const isSmallMobile = screenW <= 390;
  const isMobile = screenW <= 640;
  
  // 自適應卡牌尺寸
  const cardW = isSmallMobile ? 48 : (isMobile ? 58 : 78);
  const cardH = isSmallMobile ? 82 : (isMobile ? 98 : 132);
  
  deckFanContainer.style.setProperty('--fan-card-w', `${cardW}px`);
  deckFanContainer.style.setProperty('--fan-card-h', `${cardH}px`);
  
  // 展開寬度：電腦端限制優雅居中寬度(~580px)，手機端保證留有邊界(絕不溢出)
  const maxSpan = isMobile ? Math.max(screenW - 40 - cardW, 140) : Math.min(screenW * 0.65, 580);
  const maxAngle = isSmallMobile ? 18 : (isMobile ? 24 : 32);
  
  for (let i = 0; i < totalCards; i++) {
    const cardEl = document.createElement('div');
    cardEl.className = 'card-fan-item';
    
    const progress = i / (totalCards - 1);
    const angle = -maxAngle + progress * (maxAngle * 2);
    const offsetX = (progress - 0.5) * maxSpan;
    // 拋物線自然弧形（兩端微下垂，中央微拱起）
    const archFactor = 1 - 4 * Math.pow(progress - 0.5, 2);
    const offsetY = isMobile ? -archFactor * 14 : -archFactor * 22;
    
    const transformStr = `translateX(${offsetX.toFixed(1)}px) translateY(${offsetY.toFixed(1)}px) rotate(${angle.toFixed(1)}deg)`;
    cardEl.style.setProperty('--fan-transform', transformStr);
    cardEl.style.transform = transformStr;
    cardEl.style.zIndex = i + 1;
    cardEl.dataset.index = i;

    cardEl.addEventListener('click', () => handlePickFanCard(cardEl, i));
    deckFanContainer.appendChild(cardEl);
  }
}

// --- 點擊扇形卡牌時親自擇牌 ---
function handlePickFanCard(cardEl, deckIndex) {
  const catObj = QUESTION_CATEGORIES[currentCategory];
  const config = catObj.spread;

  if (drawnCards.length >= config.count || cardEl.classList.contains('picked')) return;

  playFlipSound();
  cardEl.classList.add('picked');

  const slotIndex = drawnCards.length;
  const cardData = shuffledDeck[deckIndex];
  const isReversed = Math.random() < 0.5;

  const item = { cardData, isReversed, slotIndex };
  drawnCards.push(item);

  const slotEl = document.getElementById(`slot-${slotIndex}`);
  if (slotEl) {
    slotEl.classList.add('occupied');
    slotEl.innerHTML = create3DCardHTML(item);
    
    const card3D = slotEl.querySelector('.tarot-card-3d');
    card3D.addEventListener('click', () => revealCard(slotIndex));
  }

  const remaining = config.count - drawnCards.length;
  fanRemainingCount.innerText = remaining;

  if (remaining > 0) {
    showToast(`已抽取第 ${slotIndex + 1} 張，還需 ${remaining} 張`);
  } else {
    showToast(`✦ ${config.count} 張牌已選定！正在為您翻開牌面...`);
    setTimeout(() => {
      deckFanStage.style.display = 'none';
      deckStack.style.display = 'none';
      deckStatus.innerText = "✦ 正在為您翻開牌面...";
      deckStatus.style.display = 'block';
      btnReset.style.display = 'inline-flex';
      
      // 將牌陣平滑對焦至螢幕中央
      spreadContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // 在使用者眼前依序翻開卡牌，看清圖案後由使用者自行往下滑動閱讀
      drawnCards.forEach((_, i) => {
        setTimeout(() => {
          revealCard(i);
        }, 400 + i * 400);
      });
    }, 350);
  }
}

// --- 自動發牌模式 ---
function handleDrawAuto() {
  if (!isShuffled || shuffledDeck.length === 0) return;

  const catObj = QUESTION_CATEGORIES[currentCategory];
  const config = catObj.spread;

  drawnCards = [];
  isRevealed = new Array(config.count).fill(false);

  for (let i = 0; i < config.count; i++) {
    const cardData = shuffledDeck[i];
    const isReversed = Math.random() < 0.5;
    drawnCards.push({
      cardData,
      isReversed,
      slotIndex: i
    });
  }

  drawnCards.forEach((item, index) => {
    const slotEl = document.getElementById(`slot-${index}`);
    if (slotEl) {
      slotEl.classList.add('occupied');
      slotEl.innerHTML = create3DCardHTML(item);
      
      const card3D = slotEl.querySelector('.tarot-card-3d');
      card3D.addEventListener('click', () => revealCard(index));
    }
  });

  playShuffleSound();
  deckStatus.innerText = "✦ 正在為您翻開牌面...";
  deckStatus.style.display = 'block';
  btnDraw.style.display = 'none';
  btnShuffle.style.display = 'none';
  btnReset.style.display = 'inline-flex';

  // 將牌陣平滑對焦至螢幕中央
  spreadContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // 依序翻開卡牌
  drawnCards.forEach((_, i) => {
    setTimeout(() => {
      revealCard(i);
    }, 400 + i * 400);
  });
}

// --- 建立 3D 卡牌 HTML 結構 ---
function create3DCardHTML(item) {
  const { cardData, isReversed, slotIndex } = item;
  const reverseOverlay = isReversed ? `<div class="reverse-tag-overlay">逆位</div>` : '';

  let cardFrontContent = '';
  if (cardData.image) {
    cardFrontContent = `
      <img src="${cardData.image}" alt="${cardData.name_en}" class="card-image-render" />
    `;
  } else {
    cardFrontContent = `
      <div class="card-svg-frame">
        <div class="card-art-border">
          <div class="card-top-arch">
            <div class="card-num-circle">${cardData.roman}</div>
          </div>
          <div class="card-center-illustration">
            ${cardData.symbol_svg}
          </div>
          <div class="card-bottom-labels">
            <div class="card-label-en">${cardData.name_en}</div>
            <div class="card-label-zh">${cardData.name_zh}</div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="tarot-card-3d ${isReversed ? 'is-reversed' : ''}" data-index="${slotIndex}">
      <!-- Card Back -->
      <div class="card-face card-face-back">
        <div class="card-back-frame">
          <div class="card-back-emblem">✦</div>
        </div>
      </div>
      <!-- Card Front -->
      <div class="card-face card-face-front">
        ${reverseOverlay}
        ${cardFrontContent}
      </div>
    </div>
  `;
}

// --- 揭曉單張卡牌 ---
function revealCard(index) {
  const slotEl = document.getElementById(`slot-${index}`);
  if (!slotEl) return;
  const card3D = slotEl.querySelector('.tarot-card-3d');
  
  if (!card3D.classList.contains('flipped')) {
    playFlipSound();
    card3D.classList.add('flipped');
    isRevealed[index] = true;
    checkAllRevealed();
  } else {
    openModal(drawnCards[index]);
  }
}

// --- 一鍵揭曉所有牌面 ---
function handleRevealAll() {
  btnRevealAll.style.display = 'none';
  drawnCards.forEach((_, index) => {
    setTimeout(() => {
      revealCard(index);
    }, index * 260);
  });
}

// --- 檢查是否全部翻牌，生成綜合解析（靜態生成，絕不強制跳轉） ---
function checkAllRevealed() {
  if (isRevealed.every(val => val === true)) {
    playSuccessChime();
    btnRevealAll.style.display = 'none';
    deckStatus.innerText = "✦ 牌面已全數揭曉！您可以點擊牌卡查看詳解，或往下滑動閱讀命運評析";
    setTimeout(() => {
      generateSynthesisReport();
    }, 400);
  }
}

// --- 極致詳細、結構化正向「耀星塔羅 ‧ 耀星引航」生成器 ---
function generateSynthesisReport() {
  synthesisSection.style.display = 'block';
  const catObj = QUESTION_CATEGORIES[currentCategory];
  const config = catObj.spread;
  const questionText = getUserQuestionText();

  synthesisTitle.innerText = `${catObj.name} ‧ 命 運 靈 感 評 析`;

  let html = `
    <p class="synth-paragraph" style="font-size: 1.1rem; color: var(--gold-light); text-align: center; margin-bottom: 1.8rem; background: rgba(212,175,55,0.08); padding: 0.8rem; border-radius: 16px; border: 1px solid rgba(212,175,55,0.3);">
      <strong>🔮 您的靈魂諮詢疑問：【 ${questionText} 】</strong>
    </p>
  `;

  // 各牌位置解析
  drawnCards.forEach((item, idx) => {
    const slot = config.slots[idx];
    const info = item.isReversed ? item.cardData.reversed : item.cardData.upright;
    const orientStr = item.isReversed ? '逆位' : '正位';
    
    html += `
      <p class="synth-paragraph">
        <strong>${slot.title} 【${item.cardData.name_zh} ‧ ${orientStr}】：</strong><br>
        關鍵能量「${info.keywords}」。${info.meaning}
      </p>
    `;
  });

  // 建立極致詳細、多維度的耀星塔羅引航報告
  const cardNames = drawnCards.map(c => `【${c.cardData.name_zh} (${c.isReversed ? '逆位' : '正位'})】`).join('、');
  const cardElements = Array.from(new Set(drawnCards.map(c => c.cardData.element.split(' ')[0]))).join('與');
  
  const c1 = drawnCards[0];
  const c2 = drawnCards[1];
  const c3 = drawnCards[drawnCards.length - 1];

  const info1 = c1.isReversed ? c1.cardData.reversed : c1.cardData.upright;
  const info2 = c2 ? (c2.isReversed ? c2.cardData.reversed : c2.cardData.upright) : info1;
  const info3 = c3.isReversed ? c3.cardData.reversed : c3.cardData.upright;

  let themeSpecificNarrative = "";
  if (currentCategory === 'love') {
    themeSpecificNarrative = `
      <p class="synth-paragraph">
        <strong>🌟 1. 情感能量靈魂顯化解析：</strong><br>
        在您所諮詢的議題「<strong>${questionText}</strong>」中，耀星塔羅顯現出 ${cardNames} 的強大能量共振。首張牌 ${c1.cardData.name_zh} 透露出當前感情能量的根本基石圍繞著「${info1.keywords}」。這意味著真摯的連結建立在彼此平等的尊嚴與真心溝通之上。搭配 ${c2 ? c2.cardData.name_zh : ''} 的流轉，雙方的真實心意與溝通脈絡正處於調和與轉化期。
      </p>
      <p class="synth-paragraph">
        <strong>🔮 2. 命運轉折與幸福契機：</strong><br>
        關鍵解答牌 ${c3.cardData.name_zh} 的降臨，給予這段關係明確且極具溫暖的耀星指引！${info3.meaning} 不必過度擔憂一時的停滯或未知，這段經歷正引導您看清內心真正的渴望。當您願意展現自信與包容時，美好的感情頻率將無縫對接，走向和諧幸福的圓滿發展。
      </p>
      <p class="synth-paragraph">
        <strong>💎 3. 耀星塔羅 ‧ 心靈三步行動指南：</strong><br>
        ✦ <strong>第一步【內在扎根】：</strong> ${info1.advice}<br>
        ✦ <strong>第二步【溫柔溝通】：</strong> ${info2.advice}<br>
        ✦ <strong>第三步【擁抱幸福】：</strong> ${info3.advice}
      </p>
    `;
  } else if (currentCategory === 'career') {
    themeSpecificNarrative = `
      <p class="synth-paragraph">
        <strong>🌟 1. 事業能量靈魂顯化解析：</strong><br>
        針對您的職涯疑問「<strong>${questionText}</strong>」，本次占卜獲得了 ${cardNames} 的輝煌指引。這顯示出您的事業能量場正由 ${cardElements} 共同主導。起手牌 ${c1.cardData.name_zh} 代表您目前扎實的專業底氣「${info1.keywords}」，您過去的累積已為您打下堅固的發展優勢。
      </p>
      <p class="synth-paragraph">
        <strong>🔮 2. 職涯躍升與突破機遇：</strong><br>
        核心終局牌 ${c3.cardData.name_zh} 為您的事業藍圖劃出了宏大的格局！${info3.meaning} 眼前不論是跳槽轉職或是內部升遷，格局與勇氣都將成為您的關鍵籌碼。只要您敢於展現個人價值，高層與貴人將對您青睞有加，職涯天花板將被徹底突破。
      </p>
      <p class="synth-paragraph">
        <strong>💎 3. 耀星塔羅 ‧ 事業三步行動指南：</strong><br>
        ✦ <strong>第一步【展現優勢】：</strong> ${info1.advice}<br>
        ✦ <strong>第二步【把握契機】：</strong> ${info2.advice}<br>
        ✦ <strong>第三步【邁向躍升】：</strong> ${info3.advice}
      </p>
    `;
  } else if (currentCategory === 'wealth') {
    themeSpecificNarrative = `
      <p class="synth-paragraph">
        <strong>🌟 1. 財富能量靈魂顯化解析：</strong><br>
        針對您的財運疑問「<strong>${questionText}</strong>」，牌陣呈現出 ${cardNames} 的金光能量匯聚。第一張牌 ${c1.cardData.name_zh} 象徵您目前財庫的基礎狀態「${info1.keywords}」。財富的積累並非偶然，而是您理性決策與謹慎應對的自然結果。
      </p>
      <p class="synth-paragraph">
        <strong>🔮 2. 財運改善與豐盛顯化：</strong><br>
        關鍵解答牌 ${c3.cardData.name_zh} 給予了極具希望的進財指引！${info3.meaning} 您的財運正在步入持續改善與擴張的黃金軌道。透過理性的資產配置與敏銳的投資眼光，未來的現金流與偏財回報將日益充盈穩健。
      </p>
      <p class="synth-paragraph">
        <strong>💎 3. 耀星塔羅 ‧ 財富三步行動指南：</strong><br>
        ✦ <strong>第一步【穩固財庫】：</strong> ${info1.advice}<br>
        ✦ <strong>第二步【敏銳布局】：</strong> ${info2.advice}<br>
        ✦ <strong>第三步【引流豐盛】：</strong> ${info3.advice}
      </p>
    `;
  } else {
    themeSpecificNarrative = `
      <p class="synth-paragraph">
        <strong>🌟 1. 人生靈魂能量顯化解析：</strong><br>
        關於您深思的議題「<strong>${questionText}</strong>」，宇宙透過 ${cardNames} 賜予您無比精準的心靈啟示。主導能量牌 ${c1.cardData.name_zh} 揭示了您內在當前的真實狀態「${info1.keywords}」，提醒您所有外在的變化皆始於內心的信念。
      </p>
      <p class="synth-paragraph">
        <strong>🔮 2. 命運轉折與智慧覺醒：</strong><br>
        終局解答牌 ${c3.cardData.name_zh} 為您指明了未來的光明道路！${info3.meaning} 保持平靜與從容，信任生命的安排與自我直覺，您正邁向身心靈高度和諧的輝煌新階段。
      </p>
      <p class="synth-paragraph">
        <strong>💎 3. 耀星塔羅 ‧ 心靈三步行動指南：</strong><br>
        ✦ <strong>第一步【平靜定心】：</strong> ${info1.advice}<br>
        ✦ <strong>第二步【順應直覺】：</strong> ${info2.advice}<br>
        ✦ <strong>第三步【擁抱圓滿】：</strong> ${info3.advice}
      </p>
    `;
  }

  html += `
    <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1.5px dashed rgba(212,175,55,0.4);">
      <h3 style="color: var(--gold-light); font-size: 1.2rem; text-align: center; margin-bottom: 1.4rem; letter-spacing: 0.18em; background: linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent); padding: 0.5rem 0;">
        ✨ 耀 星 塔 羅 ‧ 耀 星 引 航 深度 指 引 ✨
      </h3>
      ${themeSpecificNarrative}
    </div>
  `;

  synthesisContent.innerHTML = html;
  // 不強制自動滾動到文案，讓畫面平穩停留在開啟的牌面上，由使用者自行往下滑動閱讀
}

// --- 複製靈感評析報告 ---
function copySynthesisReport() {
  const catObj = QUESTION_CATEGORIES[currentCategory];
  const config = catObj.spread;
  const questionText = getUserQuestionText();

  let text = `✦ 耀星塔羅 ‧ Yaoxing Tarot 【${catObj.name}】占卜報告 ✦\n諮詢疑問：${questionText}\n\n`;

  drawnCards.forEach((item, idx) => {
    const slot = config.slots[idx];
    const info = item.isReversed ? item.cardData.reversed : item.cardData.upright;
    const orient = item.isReversed ? '逆位' : '正位';
    text += `${slot.title}: 【${item.cardData.name_zh} (${orient})】\n- 關鍵字: ${info.keywords}\n- 解析: ${info.meaning}\n\n`;
  });

  text += `✨ 綜合深度指引:\n${synthesisContent.innerText}`;

  navigator.clipboard.writeText(text).then(() => {
    showToast("靈感報告已複製至剪貼簿！");
  }).catch(() => {
    showToast("複製失敗，請手動選取文字");
  });
}

// --- 保存至占卜日誌 (LocalStorage) ---
function saveSynthesisToHistory() {
  const catObj = QUESTION_CATEGORIES[currentCategory];
  const questionText = getUserQuestionText();
  const logs = JSON.parse(localStorage.getItem('yaoxing_tarot_history') || localStorage.getItem('polaris_tarot_history') || localStorage.getItem('lumiere_tarot_history') || '[]');
  
  const newEntry = {
    id: Date.now(),
    date: new Date().toLocaleString('zh-TW', { hour12: false }),
    spreadName: `${catObj.name} - ${questionText.substring(0, 15)}...`,
    cards: drawnCards.map(item => ({
      name: item.cardData.name_zh,
      orient: item.isReversed ? '逆位' : '正位'
    })),
    excerpt: synthesisContent.innerText.substring(0, 150) + "..."
  };

  logs.unshift(newEntry);
  if (logs.length > 20) logs.pop();
  localStorage.setItem('yaoxing_tarot_history', JSON.stringify(logs));

  showToast("已成功儲存至命運日誌！");
}

// --- 開啟卡牌詳細資訊 Modal ---
function openModal(item) {
  const { cardData, isReversed, slotIndex } = item;
  const info = isReversed ? cardData.reversed : cardData.upright;
  const catObj = QUESTION_CATEGORIES[currentCategory];
  const config = catObj.spread;

  modalPosTag.innerText = config.slots[slotIndex]?.title || "牌陣位置";
  modalCardName.innerText = `${cardData.roman}. ${cardData.name_zh}`;
  
  modalOrientTag.innerText = isReversed ? "逆位" : "正位";
  modalOrientTag.style.color = isReversed ? "#ff9999" : "#f7e7a1";

  if (cardData.image) {
    modalVisual.innerHTML = `<img src="${cardData.image}" alt="${cardData.name_en}" />`;
    const imgEl = modalVisual.querySelector('img');
    if (isReversed) {
      imgEl.style.transform = 'rotate(180deg)';
    } else {
      imgEl.style.transform = 'none';
    }
  } else {
    modalVisual.innerHTML = cardData.symbol_svg;
    const modalSvg = modalVisual.querySelector('svg');
    if (isReversed && modalSvg) {
      modalSvg.style.transform = 'rotate(180deg)';
    } else if (modalSvg) {
      modalSvg.style.transform = 'none';
    }
  }

  modalKeywords.innerText = info.keywords;
  modalElement.innerText = cardData.element;
  modalMeaning.innerText = info.meaning;
  modalAdvice.innerText = info.advice;

  cardModal.style.display = 'flex';
}

// --- 22 大阿爾克那圖鑑 Modal ---
function initCodexGrid() {
  filterCodexGrid('all');
}

function filterCodexGrid(filter) {
  codexGrid.innerHTML = '';
  TAROT_DECK.forEach(card => {
    if (filter !== 'all' && !card.element.includes(filter)) return;

    const item = document.createElement('div');
    item.className = 'codex-grid-item';
    
    item.innerHTML = `
      <img src="${card.image}" alt="${card.name_zh}" class="codex-item-img" />
      <div class="codex-item-num">${card.roman}</div>
      <div class="codex-item-name">${card.name_zh}</div>
    `;

    item.addEventListener('click', () => {
      openModal({ cardData: card, isReversed: false, slotIndex: 0 });
    });

    codexGrid.appendChild(item);
  });
}

function openCodexModal() {
  codexModal.style.display = 'flex';
}

// --- 歷史日誌 Modal ---
function openHistoryModal() {
  const logs = JSON.parse(localStorage.getItem('yaoxing_tarot_history') || localStorage.getItem('polaris_tarot_history') || localStorage.getItem('lumiere_tarot_history') || '[]');
  historyList.innerHTML = '';

  if (logs.length === 0) {
    historyList.innerHTML = `<div class="empty-history">✦ 尚無任何占卜紀錄。完成占卜後點擊「保存至占卜日誌」即可記錄！</div>`;
  } else {
    logs.forEach(entry => {
      const item = document.createElement('div');
      item.className = 'history-item';
      
      const cardTags = entry.cards.map(c => `<span class="history-card-tag">${c.name} (${c.orient})</span>`).join('');
      
      item.innerHTML = `
        <div class="history-item-header">
          <span class="history-spread-name">${entry.spreadName}</span>
          <span class="history-date">${entry.date}</span>
        </div>
        <div class="history-cards-summary">
          ${cardTags}
        </div>
        <div class="history-excerpt">
          ${entry.excerpt}
        </div>
      `;
      historyList.appendChild(item);
    });
  }

  historyModal.style.display = 'flex';
}

function clearHistoryLogs() {
  if (confirm("確定要清空所有的歷史占卜日誌嗎？")) {
    localStorage.removeItem('yaoxing_tarot_history');
    localStorage.removeItem('polaris_tarot_history');
    localStorage.removeItem('lumiere_tarot_history');
    openHistoryModal();
    showToast("已清空占卜日誌");
  }
}

// --- 重置/重新占卜 ---
function handleReset() {
  isShuffled = false;
  shuffledDeck = [];
  drawnCards = [];
  isRevealed = [];

  deckStack.style.display = 'block';
  deckFanStage.style.display = 'none';

  btnShuffle.style.display = 'inline-flex';
  btnShuffle.innerText = "✨ 開始凝神洗牌";
  btnShuffle.disabled = false;

  btnDraw.style.display = 'none';
  btnDraw.disabled = false;

  btnRevealAll.style.display = 'none';
  btnReset.style.display = 'none';

  deckStatus.innerText = "點擊洗牌按鈕，開啟靈感連結";
  synthesisSection.style.display = 'none';

  renderSpreadLayout();
}
