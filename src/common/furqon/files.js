const FROM_USER_ID = 2082926;

const {
  sendArgsToChain,
  replyPropsToList
} = require("../../utils/request-chain-methods.js");

const suralar = {
  ISTEOZA_BASMALA: {
    title: "Истиоза ва Басмала",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35792, 35793, 35794, 35795]
        }),
        ctx
      });
    }
  },
  // FATIHA_SURA: {
  //   title: "💬 Фотиҳа сураси",
  //   async handler(ctx) {
  //     const replyUserId = ctx?.update?.message?.from?.id;

  //     sendArgsToChain({
  //       replyList: replyPropsToList({
  //         replyUserId,
  //         FROM_USER_ID,
  //         messageIdList: [35755, 35756, 35757],
  //       }),
  //       ctx,
  //     });
  //   },
  // },

  NABA_SURA: {
    title: "Набаъ сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35851]
        }),
        ctx
      });
    }
  },

  NAAZIAT_SURA: {
    title: "Наазиъат сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35850]
        }),
        ctx
      });
    }
  },

  ABASA_SURA: {
    title: "Абаса сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35849]
        }),
        ctx
      });
    }
  },

  TAKVIR_SURA: {
    title: "Таквир сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35848]
        }),
        ctx
      });
    }
  },

  INFITOR_SURA: {
    title: "Инфитор сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35847]
        }),
        ctx
      });
    }
  },

  MUTOFFIFUN_SURA: {
    title: "Мутоффифун сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35846]
        }),
        ctx
      });
    }
  },

  INSHIQOQ_SURA: {
    title: "Иншиқоқ сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35845]
        }),
        ctx
      });
    }
  },

  BURUJ_SURA: {
    title: "Буруж сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35844]
        }),
        ctx
      });
    }
  },

  TORIQ_SURA: {
    title: "Ториқ сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35843]
        }),
        ctx
      });
    }
  },

  ALAA_SURA: {
    title: "Аъла сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35842]
        }),
        ctx
      });
    }
  },

  GOSHIYA_SURA: {
    title: "Ғошия сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35841]
        }),
        ctx
      });
    }
  },

  FAJR_SURA: {
    title: "Фажр сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35840]
        }),
        ctx
      });
    }
  },

  BALAD_SURA: {
    title: "Балад сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35839]
        }),
        ctx
      });
    }
  },

  SHAMS_SURA: {
    title: "Шамс сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35838]
        }),
        ctx
      });
    }
  },

  LAYL_SURA: {
    title: "Лайл сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35837]
        }),
        ctx
      });
    }
  },

  DUHA_SURA: {
    title: "Дуҳа сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35836]
        }),
        ctx
      });
    }
  },

  SHARH_SURA: {
    title: "Шарҳ сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35835]
        }),
        ctx
      });
    }
  },

  TIYN_SURA: {
    title: "Тийн сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35834]
        }),
        ctx
      });
    }
  },

  ALAQ_SURA: {
    title: "Алақ сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35833]
        }),
        ctx
      });
    }
  },

  QADR_SURA: {
    title: "Қадр сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35832]
        }),
        ctx
      });
    }
  },

  BAYYINA_SURA: {
    title: "Баййина сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35831]
        }),
        ctx
      });
    }
  },

  ZALZALA_SURA: {
    title: "Залзала сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35830]
        }),
        ctx
      });
    }
  },

  ADIYAT_SURA: {
    title: "Адият сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35829]
        }),
        ctx
      });
    }
  },

  QORIA_SURA: {
    title: "Қориъа сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35828]
        }),
        ctx
      });
    }
  },

  TAKAASUR_SURA: {
    title: "Такаасур сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35827]
        }),
        ctx
      });
    }
  },

  ASR_SURA: {
    title: "Аср сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35826]
        }),
        ctx
      });
    }
  },

  HUMAZA_SURA: {
    title: "Ҳумаза сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35825]
        }),
        ctx
      });
    }
  },

  FIL_SURA: {
    title: "Фил сураси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [35824]
        }),
        ctx
      });
    }
  }

  // QURAYSH_SURA: {
  //   title: "💬 Қурайш сураси",
  //   async handler(ctx) {
  //     const replyUserId = ctx?.update?.message?.from?.id;

  //     sendArgsToChain({
  //       replyList: replyPropsToList({
  //         replyUserId,
  //         FROM_USER_ID,
  //         messageIdList: [35822, 35823],
  //       }),
  //       ctx,
  //     });
  //   },
  // },

  // MAAUUN_SURA: {
  //   title: "💬 Мааъуун сураси",
  //   async handler(ctx) {
  //     const replyUserId = ctx?.update?.message?.from?.id;

  //     sendArgsToChain({
  //       replyList: replyPropsToList({
  //         replyUserId,
  //         FROM_USER_ID,
  //         messageIdList: [35821, 35819],
  //       }),
  //       ctx,
  //     });
  //   },
  // },

  // KAVSAR_SURA: {
  //   title: "💬 Кавсар сураси",
  //   async handler(ctx) {
  //     const replyUserId = ctx?.update?.message?.from?.id;

  //     sendArgsToChain({
  //       replyList: replyPropsToList({
  //         replyUserId,
  //         FROM_USER_ID,
  //         messageIdList: [73691, 35818],
  //       }),
  //       ctx,
  //     });
  //   },
  // },

  // KAAFIRUUN_SURA: {
  //   title: "💬 Каафируун сураси",
  //   async handler(ctx) {
  //     const replyUserId = ctx?.update?.message?.from?.id;

  //     sendArgsToChain({
  //       replyList: replyPropsToList({
  //         replyUserId,
  //         FROM_USER_ID,
  //         messageIdList: [35816, 35820],
  //       }),
  //       ctx,
  //     });
  //   },
  // },

  // NASR_SURA: {
  //   title: "💬 Наср сураси",
  //   async handler(ctx) {
  //     const replyUserId = ctx?.update?.message?.from?.id;

  //     sendArgsToChain({
  //       replyList: replyPropsToList({
  //         replyUserId,
  //         FROM_USER_ID,
  //         messageIdList: [35814, 35815],
  //       }),
  //       ctx,
  //     });
  //   },
  // },

  // MASAD_SURA: {
  //   title: "💬 Масад сураси",
  //   async handler(ctx) {
  //     const replyUserId = ctx?.update?.message?.from?.id;

  //     sendArgsToChain({
  //       replyList: replyPropsToList({
  //         replyUserId,
  //         FROM_USER_ID,
  //         messageIdList: [35812, 35813],
  //       }),
  //       ctx,
  //     });
  //   },
  // },

  // IXLOS_SURA: {
  //   title: "💬 Ихлос сураси",
  //   async handler(ctx) {
  //     const replyUserId = ctx?.update?.message?.from?.id;

  //     sendArgsToChain({
  //       replyList: replyPropsToList({
  //         replyUserId,
  //         FROM_USER_ID,
  //         messageIdList: [35810, 35811],
  //       }),
  //       ctx,
  //     });
  //   },
  // },

  // FALAQ_SURA: {
  //   title: "💬 Фалақ сураси",
  //   async handler(ctx) {
  //     const replyUserId = ctx?.update?.message?.from?.id;

  //     sendArgsToChain({
  //       replyList: replyPropsToList({
  //         replyUserId,
  //         FROM_USER_ID,
  //         messageIdList: [35808, 35809],
  //       }),
  //       ctx,
  //     });
  //   },
  // },

  // NAAS_SURA: {
  //   title: "💬 Наас сураси",
  //   async handler(ctx) {
  //     const replyUserId = ctx?.update?.message?.from?.id;

  //     sendArgsToChain({
  //       replyList: replyPropsToList({
  //         replyUserId,
  //         FROM_USER_ID,
  //         messageIdList: [35806, 35807],
  //       }),
  //       ctx,
  //     });
  //   },
  // },
};

const suralarKeys = Object.keys(suralar);
const suralarValues = Object.values(suralar);
const suralarTitles = suralarValues.map((item) => item.title);

module.exports = { suralar, suralarKeys, suralarTitles };
