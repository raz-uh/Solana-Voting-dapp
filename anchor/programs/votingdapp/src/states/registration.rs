use anchor_lang::prelude::*;

#[account]
pub struct Registrations {
    pub count: u64,
}
