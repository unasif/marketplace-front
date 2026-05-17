import favouritesService from "../services/favouritesService";
import { instance } from "../api";

/**
 * Переносить локальні обрані на сервер після входу/реєстрації.
 * Викликати лише після успішної автентифікації.
 */
export const migrateLocalFavouritesToServer = async (
  userId,
  authToken,
  onWarning
) => {
  if (!userId || !authToken) {
    return { ok: false, reason: "missing-auth" };
  }

  const payload = favouritesService.exportAll();
  if (!payload.items.length) {
    return { ok: true, skipped: true };
  }

  try {
    await instance.post(
      "/favourites/migrate",
      {
        userId,
        store: payload,
      },
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    favouritesService.clear();
    return { ok: true };
  } catch {
    if (typeof onWarning === "function") {
      onWarning(
        "Не вдалося синхронізувати обране. Ваші збережені товари залишились на цьому пристрої."
      );
    }
    return { ok: false, reason: "request-failed" };
  }
};
