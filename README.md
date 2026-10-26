# 📱 Calculatrice — Calculator App

Une application calculatrice moderne et élégante compatible PWA, iOS et Android.
A modern & stylish bilingual calculator app ready for Web, Android, and iOS.

---

## 🚀 Key Features / المميزات

- ✨ **Design moderne** : Theme sombre avec animations et effets néon/glassmorphism.
- 🌐 **Multilingue** : Support Fr/En/Ar avec mode RTL automatique.
- 📱 **PWA Ready** : Installable sur écran d'accueil (iOS & Android) sans passer par le store.
- ⌨️ **Support Clavier** : Fonctionne avec le clavier physique sur PC / Mac.

---

## 📲 How to publish on Google Play Store & Apple App Store (Comment publier sur les Stores)

Pour publier cette application sur l'**App Store** et **Google Play Store**, la méthode la plus simple et officielle est d'utiliser **CapacitorJS**.

### 1. Prérequis (Prerequisites)
- [Node.js](https://nodejs.org/) installé sur votre PC/Mac.
- Pour Android : **Android Studio** (gratuit).
- Pour iOS (App Store) : Un **Mac** avec **Xcode** (gratuit) + un compte Apple Developer.

---

### 2. Étapes de conversion (Steps to build for Mobile)

Ouvrez le terminal dans le dossier du projet (`C:\Users\nizar\Desktop\application`) et exécutez :

```bash
# 1. Initialiser le projet Node
npm init -y

# 2. Installer Capacitor
npm install @capacitor/core @capacitor/cli

# 3. Initialiser Capacitor
npx cap init "Calculatrice" "com.nizar.calculatrice" --web-dir .

# 4. Ajouter Android
npm install @capacitor/android
npx cap add android

# 5. Ajouter iOS (Sur Mac uniquement)
npm install @capacitor/ios
npx cap add ios

# 6. Synchroniser les fichiers
npx cap sync
```

---

### 3. Générer le fichier pour Android (Play Store)

```bash
# Ouvrir dans Android Studio
npx cap open android
```
1. Dans Android Studio, allez dans **Build** > **Generate Signed Bundle / APK**.
2. Choisissez **Android App Bundle (.aab)**.
3. Créez votre clé de signature (Keystore).
4. Téléversez le fichier `.aab` sur votre [Google Play Console](https://play.google.com/console).

---

### 4. Générer le fichier pour iOS (App Store - sur Mac)

```bash
# Ouvrir dans Xcode
npx cap open ios
```
1. Dans Xcode, sélectionnez votre équipe de développement (Team).
2. Allez dans **Product** > **Archive**.
3. Cliquez sur **Distribute App** pour l'envoyer directement sur [App Store Connect](https://appstoreconnect.apple.com/).

---

## 🌐 Test / Aperçu Web rapide

Vous pouvez tester l'application directement dans le navigateur en ouvrant le fichier `index.html`.
