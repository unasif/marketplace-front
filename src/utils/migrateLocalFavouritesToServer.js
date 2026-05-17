// Міграція локального обраного на сервер — увімкнути після появи акаунтів.
//
// import favouritesService from "../services/favouritesService";
// import { instance } from "../api";
//
// export const migrateLocalFavouritesToServer = async (
//   userId,
//   authToken,
//   onWarning
// ) => {
//   if (!userId || !authToken) {
//     return { ok: false, reason: "missing-auth" };
//   }
//
//   const payload = favouritesService.exportAll();
//   if (!payload.items.length) {
//     return { ok: true, skipped: true };
//   }
//
//   try {
//     await instance.post(
//       "/favourites/migrate",
//       { userId, store: payload },
//       { headers: { Authorization: authToken } }
//     );
//     favouritesService.clear();
//     return { ok: true };
//   } catch {
//     if (typeof onWarning === "function") {
//       onWarning(
//         "Не вдалося синхронізувати обране. Ваші збережені товари залишились на цьому пристрої."
//       );
//     }
//     return { ok: false, reason: "request-failed" };
//   }
// };

export const migrateLocalFavouritesToServer = async () => ({
  ok: false,
  reason: "not-implemented",
});
