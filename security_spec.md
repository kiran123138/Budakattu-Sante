# Security Specification for Budakattu-Sante

## Data Invariants
1. Products must have a valid `artisanId`.
2. Orders must be linked to a valid `buyerId` (the user) and `productId`.
3. Artisan profiles are publicly readable but only editable by admins.
4. User profiles (PII) are strictly private.

## The Dirty Dozen (Potential Attack Payloads)
1. Setting `artisanId` to a non-existent ID during product creation.
2. Updating `price` of a product by an unauthorized user.
3. Reading another user's private `email` or `address`.
4. Creating an order for another user by spoofing `buyerId`.
5. Modifying `rating` of an artisan directly.
6. Injecting a 2MB string into a product's `description`.
7. Bulk deleting the `artisans` collection.
8. Listing all `orders` in the system without filtering by `buyerId`.
9. Changing the `status` of an order to 'Delivered' as a buyer.
10. Creating a product with a `negative price`.
11. Updating `joinedAt` on an artisan profile.
12. Creating a user profile with `isAdmin: true`.

## Rules Architecture
- **Master Gate**: Relational sync for orders.
- **Validation Blueprints**: Strict key and type checks for all writes.
- **PII Isolation**: Users collection split into public/private.
