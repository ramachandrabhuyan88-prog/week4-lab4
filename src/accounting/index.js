/**
 * Student Account Management System
 * Node.js Conversion from Legacy COBOL Application
 * 
 * This application replicates the three-tier COBOL architecture:
 * - Presentation Layer: Menu system (MainProgram.cob equivalent)
 * - Business Logic Layer: Account operations (Operations.cob equivalent)
 * - Data Layer: Balance storage (DataProgram.cob equivalent)
 * 
 * Business Rules:
 * - Initial account balance: $1,000.00
 * - Overdraft protection: Cannot debit more than current balance
 * - All amounts use 2-decimal precision for currency
 */

import PromptSync from 'prompt-sync';

const prompt = PromptSync({ sigint: true });

/**
 * ============================================================================
 * DATA LAYER: Account Balance Storage (equivalent to DataProgram.cob)
 * ============================================================================
 */
class AccountDataStore {
  constructor() {
    this.storageBalance = 1000.00; // Initial balance per business rule
  }

  /**
   * READ operation: Retrieve current account balance
   * @returns {number} Current balance
   */
  read() {
    return this.storageBalance;
  }

  /**
   * WRITE operation: Update account balance
   * @param {number} newBalance - New balance amount
   */
  write(newBalance) {
    this.storageBalance = newBalance;
  }

  /**
   * Format balance for display with proper currency formatting
   * @param {number} balance - Balance amount
   * @returns {string} Formatted balance string
   */
  static formatBalance(balance) {
    return balance.toFixed(2).padStart(9, '0');
  }
}

/**
 * ============================================================================
 * BUSINESS LOGIC LAYER: Account Operations (equivalent to Operations.cob)
 * ============================================================================
 */
class AccountOperations {
  constructor(dataStore) {
    this.dataStore = dataStore;
  }

  /**
   * TOTAL operation: Display current account balance
   * Equivalent to: IF OPERATION-TYPE = 'TOTAL'
   */
  total() {
    const balance = this.dataStore.read();
    console.log(`Current balance: ${AccountDataStore.formatBalance(balance)}`);
  }

  /**
   * CREDIT operation: Add funds to account (deposit)
   * Equivalent to: IF OPERATION-TYPE = 'CREDIT'
   * 
   * Business Logic:
   * 1. Prompt user for credit amount
   * 2. Read current balance
   * 3. Add amount to balance
   * 4. Write updated balance
   * 5. Display confirmation with new balance
   */
  credit() {
    const amountStr = prompt('Enter credit amount: ');
    const amount = parseFloat(amountStr);

    // Input validation
    if (isNaN(amount) || amount <= 0) {
      console.log('Invalid amount. Please enter a positive number.');
      return;
    }

    // Read-Modify-Write pattern
    let finalBalance = this.dataStore.read();
    finalBalance += amount;
    this.dataStore.write(finalBalance);

    console.log(`Amount credited. New balance: ${AccountDataStore.formatBalance(finalBalance)}`);
  }

  /**
   * DEBIT operation: Withdraw funds from account
   * Equivalent to: IF OPERATION-TYPE = 'DEBIT'
   * 
   * Business Logic:
   * 1. Prompt user for debit amount
   * 2. Read current balance
   * 3. Check if balance >= amount (OVERDRAFT PROTECTION)
   * 4. If sufficient funds:
   *    - Subtract amount from balance
   *    - Write updated balance
   *    - Display confirmation with new balance
   * 5. If insufficient funds:
   *    - Display error message
   *    - Do NOT modify balance (no write operation)
   */
  debit() {
    const amountStr = prompt('Enter debit amount: ');
    const amount = parseFloat(amountStr);

    // Input validation
    if (isNaN(amount) || amount <= 0) {
      console.log('Invalid amount. Please enter a positive number.');
      return;
    }

    // Read current balance
    let finalBalance = this.dataStore.read();

    // OVERDRAFT PROTECTION: Key business rule
    if (finalBalance >= amount) {
      finalBalance -= amount;
      this.dataStore.write(finalBalance);
      console.log(`Amount debited. New balance: ${AccountDataStore.formatBalance(finalBalance)}`);
    } else {
      console.log('Insufficient funds for this debit.');
    }
  }
}

/**
 * ============================================================================
 * PRESENTATION LAYER: Menu System (equivalent to MainProgram.cob)
 * ============================================================================
 */
class MainProgram {
  constructor() {
    this.dataStore = new AccountDataStore();
    this.operations = new AccountOperations(this.dataStore);
    this.continueFlag = true;
  }

  /**
   * Display main menu and prompt for user choice
   * Equivalent to: PERFORM UNTIL CONTINUE-FLAG = 'NO'
   */
  displayMenu() {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
  }

  /**
   * Route user selection to appropriate operation
   * Equivalent to: EVALUATE USER-CHOICE
   */
  handleUserChoice(choice) {
    switch (choice) {
      case '1':
        this.operations.total();
        break;
      case '2':
        this.operations.credit();
        break;
      case '3':
        this.operations.debit();
        break;
      case '4':
        this.continueFlag = false;
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
    }
  }

  /**
   * Main application loop
   * Equivalent to: PERFORM UNTIL CONTINUE-FLAG = 'NO'
   */
  run() {
    while (this.continueFlag) {
      this.displayMenu();
      const userChoice = prompt('Enter your choice (1-4): ');
      this.handleUserChoice(userChoice);
    }

    console.log('Exiting the program. Goodbye!');
    process.exit(0);
  }
}

/**
 * ============================================================================
 * APPLICATION ENTRY POINT
 * ============================================================================
 */
const app = new MainProgram();
app.run();
