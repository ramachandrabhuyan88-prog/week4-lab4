# COBOL Account Management System - Test Plan

**Document Version:** 1.0  
**Date:** March 18, 2026  
**System:** Student Account Management System  
**Application Type:** COBOL (Legacy) → Node.js (Target Modernization)

---

## Executive Summary

This test plan documents comprehensive test cases for validating the business logic and implementation of the COBOL Account Management System. The system manages student account balances with core operations: View Balance, Credit (Deposit), and Debit (Withdraw) with overdraft protection.

**Total Test Cases:** 20  
**Coverage Areas:** Menu navigation, Balance operations, Input validation, Business rules, Edge cases

---

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|---|---|---|---|---|---|---|---|
| TC-001 | Display main menu with valid options | Application started | 1. Run application<br>2. Observe first menu display | Menu displays with options: 1. View Balance, 2. Credit Account, 3. Debit Account, 4. Exit | | | |
| TC-002 | View Balance (TOTAL) - Initial Balance | Application started, Student account initialized | 1. Select menu option 1<br>2. Observe balance display | Current balance: $1,000.00 is displayed | | | Initial account balance per business rule |
| TC-003 | Credit operation - Valid deposit amount | Application at menu, Balance = $1,000.00 | 1. Select menu option 2<br>2. Enter credit amount: 500<br>3. Observe new balance | System displays: "Amount credited. New balance: 001500.00"<br>Menu returns after operation | | | Deposit successful, balance increased by $500 |
| TC-004 | View Balance after Credit operation | Balance = $1,500.00 after previous credit | 1. Select menu option 1<br>2. Observe balance display | Current balance: $1,500.00 is displayed | | | Confirms balance persistence after credit |
| TC-005 | Debit operation - Successful withdrawal | Application at menu, Balance = $1,500.00 | 1. Select menu option 3<br>2. Enter debit amount: 300<br>3. Observe result | System displays: "Amount debited. New balance: 001200.00"<br>Menu returns after operation | | | Withdrawal successful, balance decreased by $300 |
| TC-006 | View Balance after Debit operation | Balance = $1,200.00 after previous debit | 1. Select menu option 1<br>2. Observe balance display | Current balance: $1,200.00 is displayed | | | Confirms balance persistence after debit |
| TC-007 | Debit operation - Insufficient funds rejection | Application at menu, Balance = $1,200.00 | 1. Select menu option 3<br>2. Enter debit amount: 2000<br>3. Observe response | System displays: "Insufficient funds for this debit."<br>Balance remains: $1,200.00<br>Menu returns without balance change | | | Overdraft protection prevents negative balance |
| TC-008 | View Balance after failed Debit | Balance = $1,200.00, Debit rejected | 1. Select menu option 1<br>2. Observe balance display | Current balance: $1,200.00 is displayed (unchanged) | | | Confirms balance unchanged after failed debit |
| TC-009 | Debit operation - Full balance withdrawal | Application at menu, Balance = $1,200.00 | 1. Select menu option 3<br>2. Enter debit amount: 1200<br>3. Observe result | System displays: "Amount debited. New balance: 000000.00"<br>Menu returns after operation | | | Allows complete account drainage |
| TC-010 | Debit operation - Zero balance check | Application at menu, Balance = $0.00 | 1. Select menu option 3<br>2. Enter debit amount: 1<br>3. Observe response | System displays: "Insufficient funds for this debit."<br>Balance remains: $0.00 | | | Cannot withdraw from empty account |
| TC-011 | Credit operation - Large deposit amount | Application at menu, Balance = $0.00 | 1. Select menu option 2<br>2. Enter credit amount: 999999<br>3. Observe result | System displays: "Amount credited. New balance: 999999.00"<br>Menu returns after operation | | | System accepts maximum allowed amount |
| TC-012 | View Balance after large deposit | Balance = $999,999.00 | 1. Select menu option 1<br>2. Observe balance display | Current balance: 999999.00 is displayed | | | Large amounts handled correctly |
| TC-013 | Invalid menu choice - Non-numeric | Application at menu | 1. Select menu option<br>2. Enter: "A" (invalid)<br>3. Observe response | System displays: "Invalid choice, please select 1-4."<br>Menu redisplays for retry | | | Input validation prevents invalid selections |
| TC-014 | Invalid menu choice - Out of range | Application at menu | 1. Select menu option<br>2. Enter: "5" (out of range)<br>3. Observe response | System displays: "Invalid choice, please select 1-4."<br>Menu redisplays for retry | | | Numeric validation prevents out-of-range input |
| TC-015 | Exit application - Option 4 | Application at menu at any state | 1. Select menu option 4<br>2. Observe program termination | System displays: "Exiting the program. Goodbye!"<br>Program terminates (STOP RUN) | | | Graceful exit with confirmation message |
| TC-016 | Sequential operations - Credit then Debit | Application started, Balance = $1,000.00 | 1. Option 2: Credit $500 → Balance = $1,500<br>2. Option 3: Debit $200 → Balance = $1,300<br>3. Option 1: View Balance | Final balance: $1,300.00 | | | Multiple sequential operations maintain state |
| TC-017 | Sequential operations - Multiple Credits | Application started, Balance = $1,000.00 | 1. Option 2: Credit $100 → Balance = $1,100<br>2. Option 2: Credit $200 → Balance = $1,300<br>3. Option 2: Credit $150 → Balance = $1,450 | Final balance: $1,450.00 | | | Consecutive credits accumulate correctly |
| TC-018 | Debit from exact balance limit | Application at menu, Balance = $500.00 | 1. Option 3: Debit $500 (exact balance)<br>2. Option 1: View Balance | Debit succeeds, Final balance: $0.00 | | | Boundary condition: debit equals balance |
| TC-019 | Debit by $0.01 over limit | Application at menu, Balance = $500.00 | 1. Option 3: Debit $500.01<br>2. Observe response | System displays: "Insufficient funds for this debit."<br>Balance remains: $500.00 | | | Boundary condition: debit exceeds balance by $0.01 |
| TC-020 | Menu returns after invalid choice | Application at menu | 1. Enter invalid choice<br>2. Observe error message<br>3. Select valid option (1-4) | Invalid choice error displays, menu redisplays, valid selection processes correctly | | | Menu continues functioning after error handling |

---

## Test Coverage Summary

### Business Logic Tested

#### 1. **Menu Navigation & Input Validation**
- Valid menu options (1-4)
- Invalid non-numeric input
- Out-of-range numeric input
- Menu continuation after errors

**Test Cases:** TC-001, TC-013, TC-014, TC-020

#### 2. **View Balance Operation (TOTAL)**
- Initial balance retrieval ($1,000.00)
- Balance display after credit operations
- Balance display after debit operations
- Balance display with zero balance

**Test Cases:** TC-002, TC-004, TC-006, TC-008, TC-012

#### 3. **Credit Operation (Deposit)**
- Valid deposit amounts
- Large deposit amounts (near max limit)
- Multiple consecutive credits
- Balance persistence after credit

**Test Cases:** TC-003, TC-004, TC-011, TC-012, TC-017

#### 4. **Debit Operation (Withdrawal)**
- Successful withdrawal with sufficient funds
- Failed withdrawal with insufficient funds
- Exact balance limit withdrawal
- Boundary condition: exceeding balance by $0.01
- Zero balance rejection
- Balance persistence after debit (success and failure)

**Test Cases:** TC-005, TC-006, TC-007, TC-008, TC-009, TC-010, TC-016, TC-018, TC-019

#### 5. **Overdraft Protection (Key Business Rule)**
- Prevents withdrawals exceeding current balance
- Maintains original balance on failed withdrawal
- Clear error messaging for insufficient funds

**Test Cases:** TC-007, TC-008, TC-010, TC-019

#### 6. **State Management & Persistence**
- Balance persists across operations
- Sequential multiple operations maintain correct state
- State consistency after failed operations

**Test Cases:** TC-004, TC-006, TC-008, TC-016, TC-017

#### 7. **Application Lifecycle**
- Proper program startup
- Graceful exit via Option 4
- Menu loop continuity

**Test Cases:** TC-001, TC-015

---

## Test Execution Notes

### Precondition Requirements
- COBOL application compiled successfully with all three modules (main.cob, operations.cob, data.cob)
- Application executable ready at: `/accountsystem`
- No external dependencies or database connections required
- Initial balance of $1,000.00 set at application startup

### Test Data
- Valid amounts: $100 - $999,999.00
- Invalid amounts: Negative values, non-numeric characters, decimal precision > 2 places
- Valid menu choices: 1, 2, 3, 4
- Invalid menu choices: 0, 5, 6, 7, 8, 9, A-Z, special characters

### Environmental Assumptions
- System clock accuracy not required
- No multi-user concurrency testing (single-user system)
- Balance calculations use standard arithmetic (no rounding errors expected with 2 decimal places)
- All numeric values use PIC 9(6)V99 format (0.00 to 999,999.99)

---

## Known Limitations & Considerations

### Current Implementation Scope
- **No persistence between sessions**: Balance resets to $1,000.00 on each application restart
- **Single account only**: No multi-account or user identification
- **No transaction history**: No audit trail or previous transaction record
- **No concurrent access control**: Single-user system
- **Manual balance in memory**: No database backing

### For Node.js Modernization
When converting to Node.js, consider implementing:
1. Database persistence (PostgreSQL, MongoDB, etc.)
2. User authentication and authorization
3. Transaction history and audit logs
4. RESTful API endpoints
5. Automated unit and integration test suites
6. Error handling middleware
7. Input sanitization and validation
8. API rate limiting and security headers
9. Logging and monitoring
10. Multi-account support with user sessions

---

## Sign-Off Section

| Role | Name | Date | Signature |
|---|---|---|---|
| QA Lead | | | |
| Business Analyst | | | |
| Development Lead | | | |
| Project Manager | | | |

---

**Document History:**
| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | March 18, 2026 | AI Assistant | Initial test plan creation |
