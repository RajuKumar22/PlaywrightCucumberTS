# Demoblaze Store Test Plan

## Application Overview

This test plan covers the main user flows and edge cases for the Demoblaze online store (https://www.demoblaze.com/). It includes navigation, authentication, product browsing, cart management, checkout, and modal interactions. The plan is designed for manual and automated testing, ensuring coverage of both happy path and negative scenarios.

## Test Scenarios

### 1. Navigation and Category Browsing

**Seed:** `tests/seed.spec.ts`

#### 1.1. Homepage Navigation and Category Filtering

**File:** `specs/nav-category.spec.ts`

**Steps:**
  1. Open the homepage
  2. Verify navigation bar contains Home, Contact, About us, Cart, Log in, Sign up
  3. Click each category (Phones, Laptops, Monitors) and verify product list updates

**Expected Results:**
  - Navigation bar is present with all links
  - Category selection updates product list

### 2. Authentication Flows

**Seed:** `tests/seed.spec.ts`

#### 2.1. Sign Up Modal - Positive and Negative

**File:** `specs/auth-signup.spec.ts`

**Steps:**
  1. Click Sign up in navigation
  2. Verify modal appears
  3. Attempt sign up with blank fields
  4. Attempt sign up with valid username and password

**Expected Results:**
  - Modal appears
  - Blank fields show error
  - Valid signup succeeds or shows confirmation

#### 2.2. Log In Modal - Positive and Negative

**File:** `specs/auth-login.spec.ts`

**Steps:**
  1. Click Log in in navigation
  2. Verify modal appears
  3. Attempt login with blank fields
  4. Attempt login with valid credentials

**Expected Results:**
  - Modal appears
  - Blank fields show error
  - Valid login succeeds or shows confirmation

### 3. Product Browsing and Details

**Seed:** `tests/seed.spec.ts`

#### 3.1. Product Details Page

**File:** `specs/product-details.spec.ts`

**Steps:**
  1. Click a product from the list
  2. Verify product details page loads with name, price, description
  3. Click Add to cart and handle alert

**Expected Results:**
  - Product details are shown
  - Add to cart triggers alert

### 4. Cart Management and Checkout

**Seed:** `tests/seed.spec.ts`

#### 4.1. Add and Remove Product from Cart

**File:** `specs/cart-add-remove.spec.ts`

**Steps:**
  1. Add a product to cart
  2. Go to cart page
  3. Verify product is listed
  4. Click Delete to remove product

**Expected Results:**
  - Product is added and removed from cart

#### 4.2. Checkout Flow - Negative and Positive

**File:** `specs/cart-checkout.spec.ts`

**Steps:**
  1. Add product to cart
  2. Go to cart page
  3. Click Place Order
  4. Attempt purchase with blank fields
  5. Fill all fields and complete purchase

**Expected Results:**
  - Blank fields show error alert
  - Filled fields complete purchase and show confirmation

### 5. Modal Interactions

**Seed:** `tests/seed.spec.ts`

#### 5.1. Contact Modal

**File:** `specs/modal-contact.spec.ts`

**Steps:**
  1. Click Contact in navigation
  2. Verify modal appears
  3. Attempt to send message with blank fields
  4. Fill all fields and send message

**Expected Results:**
  - Modal appears
  - Blank fields show error or do not send
  - Filled fields send message

#### 5.2. About Us Modal

**File:** `specs/modal-about.spec.ts`

**Steps:**
  1. Click About us in navigation
  2. Verify modal appears with video player
  3. Play video and close modal

**Expected Results:**
  - Modal appears with video player
  - Video plays and modal closes
